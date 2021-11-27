import express from 'express';

import * as classRepository from '../data/classes.js';
import * as classTimeRepository from '../data/classTime.js';
import { Lesson, LessonTime } from '../db/scema.js';

const router = express.Router()


const lessonTest = [
    "격투, 태권도, 청우 체육관, 전신운동과 하체 발달에 좋은 태권도에 도전해보세요! [숙대생 할인], 숙대 앞 청우 체육관입니다. 체력 증진 및 심신 수련, 다이어트 등에 효능이 좋은 태권도에 지금 도전해보세요! 숙대생 할인 10%, 해피타임 30% 할인을 제공하고 있습니다:) 문의 & 상담 환영, 서울 용산구 청파로49길 17, 원데이클래스, no",
    "격투, 태권도, 독수리 태권도, ㅇ, ㅇ, 서울 용산구 백범로45길 9-11, 원데이클래스, yes",
    "격투, 태권도, 정무태권도, ㅇ, ㅇ, 서울 용산구 효창원로69길 15, 원데이클래스, yes",
    "격투, 검도, 갈월복지관 검도, ㅇ, ㅇ, 서울 용산구 두텁바위로 25 남영동 주민센터, 3개월, yes",
    "격투, 유도, 용산쥬도짐, ㅇ, ㅇ, 서울 용산구 효창원로 240-1, 1개월, yes",
    "격투, 태권도, 아리랑태권도장, ㅇ, ㅇ, 서울 용산구 한강대로87길 3, 원데이클래스, yes",
    "격투, 태권도, 튼튼태권도, ㅇ, ㅇ, 서울 용산구 백범로 341, 원데이클래스, yes",
    "격투, 태권도, CTA퍼스트태권도, ㅇ, ㅇ, 서울 마포구 대흥로24길 24 마포프레스티지자이 C동 B4층 CTA퍼스트태권도, yes",
    "격투, 태권도, 경희대 효 태권도 교육관, ㅇ, ㅇ, 서울 용산구 새창로 70 도원동삼성래미안, 1개월, yes"
]

const lessonTimeTest = [
    "1, Mon, 1200, 1300, 2021-12-06, 250000, 100000, 10, 2, yes",
    "1, Mon, 1400, 1500, 2021-12-27, 240000, 110000, 10, 3, yes",
    "1, Wed, 1300, 1400, 2021-12-01, 200000, 150000, 20, 17, yes",
    "1, Wed, 1400, 1500, 2021-12-15, 210000, 150000, 20, 12, yes",
    "1, Fri, 2000, 2100, 2021-12-17, 220000, 200000, 20, 16, yes",
    "2, Mon, 1200, 1300, 2021-12-06, 230000, 120000, 10, 2, yes",
    "3, Mon, 1200, 1300, 2021-12-06, 200000, 170000, 10, 2, yes",
    "4, Mon, 1200, 1300, 2021-12-06, 230000, 125000, 10, 2, yes",
    "5, Mon, 1200, 1300, 2021-12-06, 300000, 210000, 10, 2, yes",
    "6, Mon, 1500, 1600, 2021-12-06, 230000, 110000, 10, 2, yes",
    "7, Mon, 1200, 1300, 2021-12-06, 230000, 280000, 10, 2, yes",
    "8, Mon, 1200, 1300, 2021-12-06, 230000, 125000, 10, 2, yes",
    "9, Mon, 1200, 1300, 2021-12-06, 200000, 130000, 10, 2, yes"
]


router.get("/", async (req, res) => {

    //새 데이터 파싱 및 입력
    for (var data of lessonTest) {
        var dataSet = data.split(', ');

        var info = {
            "owner": "test",
            category: dataSet[0],
            subCategory: dataSet[1],
            title: dataSet[2],
            description: dataSet[3],
            detail: dataSet[4],
            address: dataSet[5],
            type: dataSet[6],
            parking: dataSet[7],
            totalTime: "1"
        }

        await classRepository.createClass(info)
    }

    for (var data of lessonTimeTest) {
        var dataSet = data.split(', ');

        var info = {
            lessonId: dataSet[0],
            day: dataSet[1],
            startTime: parseInt(dataSet[2]),
            endTime: parseInt(dataSet[3]),
            startDate: dataSet[4],
            originPrice: dataSet[5],
            price: dataSet[6],
            capacity: dataSet[7],
            people: dataSet[8],
            appliable: dataSet[9],
        }

        await classTimeRepository.createTime(info)
    }

    res.sendStatus(201);
})

export default router;