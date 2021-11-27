import { geocoder } from '../map/map.js';

import SQ from 'sequelize';
const Op = SQ.Op;


import { Lesson, LessonTime, Image, Review } from '../db/scema.js'

const Sequelize = SQ.Sequelize;


const LESSON = {
    attributes: [
        'id',
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

const INCLUDE = {
    include: [
        {
            model: Image,
            attributes: ['name', 'type'],
            limit: 1
        },
        {
            model: LessonTime,
            attributes: ['originPrice', 'price', 'day', 'startTime', 'endTime'],
            order: [['price', 'ASC']],
            where: {
                appliable: "yes"
            }
        }]
}

const FLITER = {
    attributes: [
        'id',
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
    })
}

export async function findClassCards(category, sub, type, order = false,) {

    //1 신규순 정렬, 전체 카테고리
    if (order && sub == "전체") {
        return Lesson.findAll({
            ...LESSON,
            ...INCLUDE,
            where: { category, type: { [Op.in]: type } },
            ...ORDER_BY_TIME
        })
    }
    //2 신규순 정렬, 서브 카테고리
    else if (order && sub != "전체") {

        return Lesson.findAll({
            ...LESSON,
            ...INCLUDE,
            where: { category, subCategory: { [Op.in]: sub }, type: { [Op.in]: type } },
            ...ORDER_BY_TIME
        })
    }
    //3 기타 정렬, 전체 카테고리
    else if (!order && sub == "전체") {

        return Lesson.findAll({
            ...LESSON,
            ...INCLUDE,
            where: { category, type: { [Op.in]: type } },
        })
    }
    //4 기타 정렬, 서브 카테고리
    else {

        return Lesson.findAll({
            ...LESSON,
            ...INCLUDE,
            where: { category, subCategory: { [Op.in]: sub }, type: { [Op.in]: type } }
        })
    }
}

export async function findClassCardsWithFilter(category, sub, price, type, order = false) {

    //1 신규순 정렬, 전체 카테고리
    if (order && sub == "전체") {
        return Lesson.findAll({
            ...FLITER,
            include: [{
                model: Image,
                attributes: ['name', 'type'],
                limit: 1
            },
            {
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
            where: { category, type: { [Op.in]: type } },
            ...ORDER_BY_TIME
        })
    }
    //2 신규순 정렬, 서브 카테고리
    else if (order && sub != "전체") {

        return Lesson.findAll({
            ...FLITER,
            include: [{
                model: Image,
                attributes: ['name', 'type'],
                limit: 1
            },
            {
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
            where: { category, subCategory: { [Op.in]: sub }, type: { [Op.in]: type } },
            ...ORDER_BY_TIME
        })
    }
    //3 기타 정렬, 전체 카테고리
    else if (!order && sub == "전체") {

        return Lesson.findAll({
            ...FLITER,
            include: [{
                model: Image,
                attributes: ['name', 'type'],
                limit: 1
            },
            {
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
            where: { category, type: { [Op.in]: type } },
        })
    }
    //4 기타 정렬, 서브 카테고리
    else {

        return Lesson.findAll({
            ...FLITER,
            include: [{
                model: Image,
                attributes: ['name', 'type'],
                limit: 1
            },
            {
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
            where: { category, subCategory: { [Op.in]: sub }, type: { [Op.in]: type } },
        })
    }
}


export async function findOneClass(classId, price) {
    return await Lesson.findByPk(classId, {
        include: [
            {
                model: Image,
                attributes: ['name', 'type'],
            },
            {
                model: LessonTime,
                attributes: ['day', 'startTime', 'endTime', 'startDate', 'price', 'capacity'],
                where: {
                    price: {
                        [Op.and]: {
                            [Op.gte]: price[0],
                            [Op.lte]: price[1],
                        }
                    },
                    appliable: "yes"
                }
            },
        ]
    })
}