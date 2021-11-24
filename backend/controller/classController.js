import express from 'express'
import path from 'path'

import * as classRepository from '../data/classes.js';
import * as userRepository from '../data/user.js';
import * as tableRepository from '../data/timetable.js';
import * as geolib from 'geolib';

//클래스 생성
export async function createClass(req, res) {
    await classRepository.createClass(req.body)

    res.sendStatus(200);
}

//전체 클래스카드 받아오기
export async function getClasses(req, res) {
    const category = req.params.category;
    const sub = req.params.sub;
    const order = req.params.order;
    const userId = req.userId;

    //사용자 위치 반환
    const user = await userRepository.findById(userId);
    const here = [user.latitude, user.longitude]

    //클래스 정보 받아오기
    const classes = await classRepository.findClassCards(
        category,
        sub,
        order == "time" ? true : false
    );

    //사용자 시간표에 맞춰 클래스 1차 필터링
    //클래스 내에 사용자 시간표에 들어가는 lessonTime이 있으면 일단 통과
    const table = await tableRepository.getTimetable(userId);

    const timeList = table.time.split(", ")

    let timetable = []
    timeList.forEach(item => {

        var itemArray = item.split("~")

        var set = { start: parseInt(itemArray[0]), end: parseInt(itemArray[1]), day: itemArray[2] }

        timetable.push(set)

    })

    const filtered = await firstFilter(classes, timetable)

    //최저가, 최고가, 할인률, 거리 반환
    let { newClasses, lowest, highest } = await processing(filtered, here)

    //거리순 정렬
    newClasses = await orderByDst(order, newClasses)

    //금액순 정렬
    newClasses = await orderByPrice(order, newClasses)

    res.status(200).json({ classes: newClasses, lowest, highest, message: "SUCCESS" })
}

//필터링된 클래스 카드 가져오기
export async function getClassesWithFilter(req, res) {
    const { category, sub, order } = req.params;
    const time = req.body.time;
    const certainDst = req.body.distance;
    const certainPrice = req.body.price;
    const userId = req.userId;

    //각 필터가 비어있는 경우 처리
    if (!time) {
        time = []
        defaultTime = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        for (var df of defaultTime) {
            time.push({ start: 0, end: 2400, day: df })
        }
    }
    if (!certainDst) {
        certainDst = 3000
    }
    if (!certainPrice) {
        certainPrice = [0, 10000000]
    }

    //사용자 위치 반환
    const user = await userRepository.findById(userId);
    const here = [user.latitude, user.longitude]

    //클래스 정보 받아오기
    const classes = await classRepository.findClassCardsWithFilter(
        category,
        sub,
        certainPrice,
        order == "time" ? true : false
    )

    //사용자 시간표에 맞춰 클래스 1차 필터링
    //클래스 내에 사용자 시간표에 들어가는 lessonTime이 있으면 일단 통과

    const filtered = await firstFilter(classes, time)


    //최저가, 최고가, 할인률, 거리 반환
    let { newClasses, lowest, highest } = await processing(filtered, here, certainDst)

    //거리순 정렬
    newClasses = await orderByDst(order, newClasses)

    //금액순 정렬
    newClasses = await orderByPrice(order, newClasses)

    res.status(200).json({ classes: newClasses, lowest, highest, message: "SUCCESS" });
}

//클래스 이미지 받기
export async function getImages(req, res) {
    const { url } = req.body

    const option = {
        root: path.join('resource')
    }

    res.sendFile(fileName, options)
}

//필터링된 클래스 이미지 받기
export async function getImagesWithFilter(req, res) {

}


async function firstFilter(classes, timetable) {

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

async function processing(filtered, here, certainDst = 3000) {
    let newClasses = [];
    let lowest = 9999999;
    let highest = 0;
    let urls = [];
    for (let oneClass of filtered) {
        var origin = oneClass.lessonTimes[0].originPrice;
        var price = oneClass.lessonTimes[0].price;

        //거리계산

        var loc = [oneClass.latitude, oneClass.longitude]

        var distance = await geolib.getDistance(
            { latitude: loc[0], longitude: loc[1] },
            { latitude: here[0], longitude: here[1] }
        );

        //3km 밖이면 필터링
        if (distance > certainDst) {
            continue;
        }

        //할인률
        var rate = (price / origin) * 100;

        //최저가, 최고가
        if (lowest > price) lowest = price;
        if (highest < price) highest = price;

        const list = {
            "owner": oneClass.owner,
            "subCategory": oneClass.subCategory,
            "title": oneClass.title,
            "description": oneClass.description,
            "type": oneClass.type,
            "address": oneClass.address,
            "lessonTimes": oneClass.lessonTimes,
        }

        //url 따로 모으기
        urls.push(oneClass.url)

        newClasses.push({ ...list, discountRate: rate, distance })
    }

    return { newClasses, lowest, highest }
}

async function orderByDst(order, newClasses) {
    if (order == "dst") {
        newClasses.sort(function (a, b) {

            return parseFloat(a.distance) - parseFloat(b.distance);

        });
    }

    return newClasses
}

async function orderByPrice(order, newClasses) {

    if (order == "price") {
        newClasses.sort(function (a, b) {

            return parseFloat(a.lessonTimes[0].price) - parseFloat(b.lessonTimes[0].price);

        });
    }

    return newClasses
}