import express from 'express'
import zip from 'express-zip'
import path from 'path'
import fs from 'fs'

import * as classRepository from '../data/classes.js';
import * as userRepository from '../data/user.js';
import * as tableRepository from '../data/timetable.js';
import * as middleware from '../middleware/class.js';

//클래스 생성
export async function createClass(req, res) {
    await classRepository.createClass(req.body)

    res.sendStatus(200);
}

//전체 클래스카드 받아오기
export async function getClasses(req, res) {
    const category = decodeURIComponent(req.params.category);
    const sub_ = decodeURIComponent(req.params.sub);
    const order = req.params.order;
    const direction = req.params.direction;
    const userId = req.userId;

    //가격순 점검
    if (order == "price" && !direction) {
        return res.status(400).json({ message: "price 필터링에는 url에 /low 혹은 /high를 붙여줘야 합니다" })
    }

    //서브 카테고리 분리
    let sub;
    if (sub_.includes('.')) {
        sub = sub_.split('.')
    } else {
        sub = [sub_]
    }

    //console.log(sub)

    //사용자 위치 반환
    const user = await userRepository.findById(userId);
    const here = [user.latitude, user.longitude]

    //클래스 정보 받아오기
    const classes = await classRepository.findClassCards(
        category,
        sub,
        order == "time" ? true : false,
    );

    //사용자 시간표에 맞춰 클래스 1차 필터링
    //클래스 내에 사용자 시간표에 들어가는 lessonTime이 있으면 일단 통과
    const table = await tableRepository.getTimetable(userId);
    let timeList
    if (table.dataValues.continuousTime.includes(", ")) {
        timeList = table.dataValues.continuousTime.split(", ")
    } else {
        timeList = [table.dataValues.continuousTime]
    }

    let timetable = []
    timeList.forEach(item => {

        let itemArray
        if (item.includes("~")) {
            itemArray = item.split("~")
        } else {
            itemArray = [item]
        }

        var set = { day: itemArray[0], start: parseInt(itemArray[1]), end: parseInt(itemArray[2]) }

        timetable.push(set)

    })

    const filtered = await middleware.firstFilter(classes, timetable)


    //최저가, 최고가, 할인률, 거리 반환
    let { newClasses, lowest, highest, imageInfo } = await middleware.processing(filtered, here)

    //거리순 정렬
    if (order == "dst") {
        newClasses = await middleware.orderByDst(order, newClasses)
    }

    //금액순 정렬
    if (order == "price") {
        newClasses = await middleware.orderByPrice(order, direction, newClasses)
    }

    res.status(200).json({ classes: newClasses, lowest, highest, imageInfo, message: "SUCCESS" })
}

//필터링된 클래스 카드 가져오기
export async function getClassesWithFilter(req, res) {
    const category = decodeURIComponent(req.params.category)
    const sub_ = decodeURIComponent(req.params.sub)
    const order = req.params.order;
    const direction = req.params.direction;
    let time = req.body.time;
    let certainDst = req.body.distance;
    let certainPrice = req.body.price;
    let type = req.body.type;
    const userId = req.userId;

    //가격순 점검

    if (order == "price" && !direction) {
        return res.status(400).json({ message: "price 필터링에는 url에 /low 혹은 /high를 붙여줘야 합니다" })
    }

    //서브 카테고리 분리
    let sub
    if (sub_.includes('.')) {
        sub = sub_.split('.')
    } else {
        sub = [sub_]
    }

    //각 필터가 비어있는 경우 디폴트 처리
    if (!time) {
        time = []
        const defaultTime = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        for (var df of defaultTime) {
            time.push({ timeList: [0, 2300], day: df })
        }
    }
    if (!certainDst) {
        certainDst = 3000
    }
    if (!certainPrice) {
        certainPrice = [0, 10000000]
    }
    if (!type) {
        type = ["원데이", "1개월", "3개월", "6개월"]
    } else {
        type = [type]
    }

    //사용자 위치 반환
    const user = await userRepository.findById(userId);
    const here = [user.latitude, user.longitude]

    //클래스 정보 받아오기
    const classes = await classRepository.findClassCardsWithFilter(
        category,
        sub,
        certainPrice,
        type,
        order == "time" ? true : false,
    )

    //사용자 시간표에 맞춰 클래스 1차 필터링
    //클래스 내에 사용자 시간표에 들어가는 lessonTime이 있으면 일단 통과
    time = await middleware.calculateTime(time);
    const filtered = await middleware.firstFilter(classes, time)


    //최저가, 최고가, 할인률, 거리 반환
    let { newClasses, lowest, highest, imageInfo } = await middleware.processing(filtered, here, certainDst)

    //거리순 정렬
    if (order == "dst") {
        newClasses = await middleware.orderByDst(order, newClasses)
    }

    //금액순 정렬
    if (order == "price") {
        newClasses = await middleware.orderByPrice(order, direction, newClasses)
    }

    res.status(200).json({ classes: newClasses, lowest, highest, imageInfo, message: "SUCCESS" });
}

//클래스 이미지 받기
export async function getImages(req, res) {
    const { imageInfo } = req.body

    const __dirname = path.resolve()

    let zip = []
    for (var one of imageInfo) {
        var file = one.name + "." + one.type
        var filePath = path.join(__dirname, "/resource", file)

        try {
            if (!fs.existsSync(filePath)) {
                return res.status(404).json({ message: "존재하지 않는 이미지 입니다." })
            }
        } catch (err) {
            console.log(err)
        }

        zip.push({ path: filePath, name: file })
    }

    res.zip(zip)
}


//클래스 세부페이지 가져오기
export async function getOneClass(req, res) {
    let { time, price } = req.body;
    const classId = req.params.classId;
    const userId = req.userId

    //시간표 처리
    let timeList = []
    if (!time) {
        const table = await tableRepository.getTimetable(userId)
        if (table.dataValues.continuousTime.includes(", ")) {
            time = table.dataValues.continuousTime.split(", ")
        } else {
            time = [table.dataValues.continuousTime]
        }

        time.forEach(item => {

            let itemArray
            if (item.includes("~")) {
                itemArray = item.split("~")
            } else {
                itemArray = [item]
            }

            var set = { day: itemArray[0], start: parseInt(itemArray[1]), end: parseInt(itemArray[2]) }

            timeList.push(set)

        })
    } else {
        timeList = await middleware.calculateTime(time);
    }

    //가격 필터 처리
    if (!price) {
        price = [0, 10000000]
    }

    //수업 하나 가져오기
    const lesson = await classRepository.findOneClass(classId, price);

    if (!lesson) {
        return res.status(404).json({ "message": "class not found" })
    }

    //console.log(lesson.dataValues.lessonTimes)

    //레슨타임 필터링, 적절한 값들만 가져오기
    const newClass = await middleware.processForOne(lesson, timeList);

    res.status(200).json(newClass)
}