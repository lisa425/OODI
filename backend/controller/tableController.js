import express from 'express';
import * as tableRepository from '../data/timetable.js'

//테이블 생성
export async function setTimetable(req, res) {
    const { time } = req.body
    const userId = req.userId;

    await tableRepository.setTimetable(time, userId);

    res.status(201).json({ message: "SUCCESS" });

}

//사용가능 시간 가져오기
export async function getTime(req, res) {
    const userId = req.userId;

    const time = await tableRepository.getTimetable(userId)

    const timeList = time.time.split(", ")

    let total = 0;
    timeList.forEach(item => {

        var itemArray = item.split("~")

        //minite 단위
        var s = [parseInt(itemArray[0].slice(0, 2)), parseInt(itemArray[0].slice(2))]
        var start = (s[0] * 60) + s[1]


        var e = [parseInt(itemArray[1].slice(0, 2)), parseInt(itemArray[1].slice(2))]
        var end = (e[0] * 60) + e[1]

        total += (end - start)

    })

    total = (total / 60).toFixed(1)

    res.status(200).json({ totalTime: total, message: "SUCCESS" })

}

//시간표 가져오기
export async function getTable(req, res) {
    const userId = req.userId;

    const time = await tableRepository.getTimetable(userId)

    const timeList = time.time.split(", ")

    let timetable = []
    timeList.forEach(item => {

        var itemArray = item.split("~")

        var set = { start: itemArray[0], end: itemArray[1], day: itemArray[2] }

        timetable.push(set)
    })

    res.status(200).json({ timetable, message: "SUCCESS" })

}