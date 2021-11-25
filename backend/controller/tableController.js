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

    if (!time) { res.status(404).json({ message: "시간표가 없습니다." }) }

    const timeList = time.continuousTime.split(", ")

    let total = 0;
    timeList.forEach(item => {

        var itemArray = item.split("~")
        console.log(itemArray)

        //minite 단위
        var s = [parseInt(itemArray[1].slice(0, 2)), parseInt(itemArray[1].slice(2))]
        var start = (s[0] * 60) + s[1]
        console.log(start)


        var e = [parseInt(itemArray[2].slice(0, 2)), parseInt(itemArray[2].slice(2))]
        var end = (e[0] * 60) + e[1]
        console.log(end)

        total += (end - start)

        console.log(total)

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

        var itemArray = item.split("-")

        let timeList = []
        for (var i = 1; i < itemArray.length; i++) {
            timeList.push(parseInt(itemArray[i]))
        }

        var set = { day: itemArray[0], timeList }

        timetable.push(set)
    })

    res.status(200).json({ timetable, message: "SUCCESS" })

}