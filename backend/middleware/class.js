import express from 'express'
import * as geolib from 'geolib';


export async function firstFilter(classes, timetable) {

    let filtered = [];
    for (var item of classes) {
        for (var timeItem of item.lessonTimes) {
            var startTime = timeItem.startTime
            var endTime = timeItem.endTime
            var day = timeItem.day
            var check = false;

            for (var one of timetable) {
                if (day == one.day && startTime >= one.start && endTime <= one.end) {
                    filtered.push(item)
                    check = true;
                    break;
                }
            }

            if (check == true) break;
        }
    }
    return filtered
}

export async function processing(filtered, here, certainDst = 3000) {
    let newClasses = [];
    let lowest = 9999999;
    let highest = 0;
    let imageInfo = [];
    for (let oneClass of filtered) {



        //거리계산
        var loc = [oneClass.latitude, oneClass.longitude]

        var distance = await geolib.getDistance(
            { latitude: loc[0], longitude: loc[1] },
            { latitude: here[0], longitude: here[1] }
        );

        //3km 혹은 지정 범위 밖이면 필터링
        if (distance > certainDst) {
            continue;
        }

        //할인률
        let rate = 100 - ((oneClass.lessonTimes[0].price / oneClass.lessonTimes[0].originPrice) * 100);

        for (var oneTime of oneClass.lessonTimes) {
            var origin = oneTime.originPrice;
            var price = oneTime.price;

            //최저가, 최고가
            if (lowest > price) lowest = price;
            if (highest < price) highest = price;
        }

        const list = {
            "id": oneClass.id,
            "owner": oneClass.owner,
            "subCategory": oneClass.subCategory,
            "title": oneClass.title,
            "description": oneClass.description,
            "type": oneClass.type,
            "address": oneClass.address,
            "lessonTimes": oneClass.lessonTimes,
        }


        //url 따로 모으기
        let image = oneClass.dataValues.images[0]
        if (image) {
            imageInfo.push({ name: image.dataValues.name, type: image.dataValues.type })
        }
        else {
            imageInfo.push({})
        }

        newClasses.push({ ...list, discountRate: rate, distance, })
    }

    return { newClasses, lowest, highest, imageInfo }
}

export async function orderByDst(order, newClasses) {
    if (order == "dst") {
        newClasses.sort(function (a, b) {

            return parseFloat(a.distance) - parseFloat(b.distance);

        });
    }

    return newClasses
}

export async function orderByPrice(order, direction, newClasses) {

    if (order == "price" && direction == "low") {
        newClasses.sort(function (a, b) {

            return parseFloat(a.lessonTimes[0].price) - parseFloat(b.lessonTimes[0].price);

        });
    } else if (order == "price" && direction == "high") {
        newClasses.sort(function (a, b) {

            return parseFloat(b.lessonTimes[0].price) - parseFloat(a.lessonTimes[0].price);

        });
    }

    return newClasses
}

//time 포맷변경 (0000 -> day~0000~0000)
export async function setTimeSet(time) {
    //time: [{timeList: [0000, 0000, 0000], day}]

    let continuous = []

    for (var timeSet of time) {
        var start = 0
        var end = 0
        var day = timeSet.day;
        var timeList = timeSet.timeList;

        var oneCtn = ""
        for (var one of timeList) {

            if (start == 0) { start = end = one }
            else if (one - end == 100) { end = one }
            else {
                if (end == 0) { end = start }
                end += 100

                if (start < 1000) { start = "0" + start; }
                if (end < 1000) { end = "0" + end }

                var tmp = day + "~" + start + "~" + end
                if (oneCtn == "") { oneCtn = tmp }
                else { oneCtn = oneCtn + ", " + tmp }

                start = end = one
            }
        }

        if (end == 0) { end = start }
        end += 100

        if (start < 1000) { start = "0" + start }
        if (end < 1000) { end = "0" + end }

        var tmp = day + "~" + start + "~" + end
        if (oneCtn == "") { oneCtn = tmp }
        else { oneCtn = oneCtn + ", " + tmp }

        continuous.push(oneCtn)

    }


    return continuous
}

//포맷변경 ("day~0000~0000" -> {day, start, end})
export async function calculateTime(time) {

    //time_ : ["day~0000~0000", "day~0000~0000"]
    let timetable = []
    time.forEach(item => {

        let itemArray
        if (item.includes("~")) {
            itemArray = item.split("~")
        } else {
            itemArray = [item]
        }

        var set = { day: itemArray[0], start: parseInt(itemArray[1]), end: parseInt(itemArray[2]) }

        timetable.push(set)

    })

    //time : [{day, start, end}]


    return timetable;
}

export async function processForOne(lesson, timetable) {

    let max = 0;

    //lessonTimes 필터로 거르기
    let lessonTimes = [];
    for (let timeItem of lesson.dataValues.lessonTimes) {
        var startTime = timeItem.startTime
        var endTime = timeItem.endTime
        var day = timeItem.day
        let startDate;
        if (timeItem.startDate.length == 10) {
            startDate = [timeItem.startDate]
        } else {
            startDate = timeItem.startDate.split(", ")
        }

        let newDate = []
        for (var date of startDate) {

            var now = new Date();
            var limit = 4 * 7 * 24 * 60 * 60 * 1000;
            var parseDate = new Date(new Date(date).toISOString());

            if (now.getTime() <= parseDate.getTime() && parseDate.getTime() <= (now.getTime() + limit)) {
                newDate.push(date)
            }
        }

        for (var one of timetable) {
            if (day == one.day && startTime >= one.start && endTime <= one.end) {

                if (max < timeItem.capacity) {
                    max = timeItem.capacity
                }

                timeItem = {
                    day,
                    startTime,
                    endTime,
                    startDate: newDate,
                    price: timeItem.price,
                }

                lessonTimes.push(timeItem)

            }
        }
    }

    //image url 따로 가져오기
    let imageInfo = []
    for (var image of lesson.dataValues.images) {
        imageInfo.push({ name: image.dataValues.name, type: image.dataValues.type })
    }

    const data = lesson.dataValues
    const list = {
        category: data.category,
        subCategory: data.subCategory,
        title: data.title,
        description: data.description,
        totalTime: data.totalTime,
        capacity: data.capacity,
        address: data.address,
        type: data.type,
        parking: data.parking,
        detail: data.detail,
    }

    const newClass = { ...list, lessonTimes, imageInfo, maxCapacity: max }

    return newClass
}