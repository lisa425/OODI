import { geocoder } from '../map/map.js';

import SQ from 'sequelize';
const Op = SQ.Op;


import { Lesson, LessonTime, Image } from '../db/scema.js'
import * as imageRepository from './image.js';
import * as classTimeRepository from './classTime.js';

const Sequelize = SQ.Sequelize;


//TODO: 이미지 빼고 따로 url 짜기
const INCLUDE_CLASS = {
    attributes: [
        'owner',
        'subCategory',
        'title',
        'description',
        'type',
        'address',
        'latitude',
        'longitude'
    ],
    include: [{
        model: Image,
        attributes: ['url'],
        limit: 1,
    }, {
        model: LessonTime,
        attributes: ['originPrice', 'price', 'day', 'startTime', 'endTime'],
        order: [['price', 'ASC']],
    }]
}

const INCLUDE_FLITER = {
    attributes: [
        'owner',
        'subCategory',
        'title',
        'description',
        'type',
        'address',
        'latitude',
        'longitude'
    ],

}

const ORDER_BY_TIME = { order: [['createdAt', 'DESC']] }




export async function createClass(info) {
    const loc = await geocoder.geocode(info.address)
        .then(res => {
            return [res[0].latitude, res[0].longitude]
        })
        .catch(err => {
            console.log("err: " + err);
        })

    return Lesson.create({
        ...info,
        latitude: loc[0],
        longitude: loc[1],
    }).then(data => {
        console.log(data)
    })
}

export async function findClassCards(category, sub, order = false) {

    //1 신규순 정렬, 전체 카테고리
    if (order && sub == "전체") {
        return Lesson.findAll({
            ...INCLUDE_CLASS,
            where: { category },
            ...ORDER_BY_TIME
        })
    }
    //2 신규순 정렬, 서브 카테고리
    else if (order && sub != "전체") {

        return Lesson.findAll({
            ...INCLUDE_CLASS,
            where: { category, subCategory: sub },
            ...ORDER_BY_TIME
        })
    }
    //3 기타 정렬, 전체 카테고리
    else if (!order && sub == "전체") {

        return Lesson.findAll({
            ...INCLUDE_CLASS,
            where: { category },
        })
    }
    //4 기타 정렬, 서브 카테고리
    else {

        return Lesson.findAll({
            ...INCLUDE_CLASS,
            where: { category, subCategory: sub }
        })
    }


}

export async function findClassCardsWithFilter(category, sub, price, order = false) {

    console.log(price);

    //1 신규순 정렬, 전체 카테고리
    if (order && sub == "전체") {
        return Lesson.findAll({
            ...INCLUDE_FLITER,
            include: [{
                model: LessonTime,
                attributes: ['originPrice', 'price', 'day', 'startTime', 'endTime'],
                where: {
                    price: {
                        [Op.and]: {
                            [Op.gte]: price[0],
                            [Op.lte]: price[1],
                        }
                    }
                },
                order: [['price', 'ASC']],
            }],
            where: { category },
            ...ORDER_BY_TIME
        })
    }
    //2 신규순 정렬, 서브 카테고리
    else if (order && sub != "전체") {

        return Lesson.findAll({
            ...INCLUDE_FLITER,
            include: [{
                model: LessonTime,
                attributes: ['originPrice', 'price', 'day', 'startTime', 'endTime'],
                where: {
                    price: {
                        [Op.and]: {
                            [Op.gte]: price[0],
                            [Op.lte]: price[1],
                        }
                    }
                },
                order: [['price', 'ASC']],
            }],
            where: { category, subCategory: sub },
            ...ORDER_BY_TIME
        })
    }
    //3 기타 정렬, 전체 카테고리
    else if (!order && sub == "전체") {

        return Lesson.findAll({
            ...INCLUDE_FLITER,
            include: [{
                model: LessonTime,
                attributes: ['originPrice', 'price', 'day', 'startTime', 'endTime'],
                where: {
                    price: {
                        [Op.and]: {
                            [Op.gte]: price[0],
                            [Op.lte]: price[1],
                        }
                    }
                },
                order: [['price', 'ASC']],
            }],
            where: { category },
        })
    }
    //4 기타 정렬, 서브 카테고리
    else {

        return Lesson.findAll({
            ...INCLUDE_FLITER,
            include: [{
                model: LessonTime,
                attributes: ['originPrice', 'price', 'day', 'startTime', 'endTime'],
                where: {
                    price: {
                        [Op.and]: {
                            [Op.gte]: price[0],
                            [Op.lte]: price[1],
                        }
                    }
                },
                order: [['price', 'ASC']],
            }],
            where: { category, subCategory: sub },
        })
    }
}