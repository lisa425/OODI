import express from 'express';
import jwt from 'jsonwebtoken'

import * as userRepository from '../data/user.js';
import * as tableRepository from '../data/timetable.js';
import { config } from '../config.js';

function makeToken(id) {
    return jwt.sign({ id }, config.jwt.secretKey)
}


export async function login(req, res) {
    const { phonenum } = req.body;

    const userId = await userRepository.findByPhonenum(phonenum);

    //console.log("userId: " + userId)

    if (!userId) {
        return res.status(200).json({ message: "회원가입 대상자입니다." });
    }

    const token = makeToken(userId);
    //console.log(token);

    return res.status(200).json({ token, message: "SUCCESS" });

}

export async function signup(req, res) {
    const { phonenum, name, address } = req.body;

    const userId = await userRepository.createUser({
        phonenum,
        name,
        address
    })

    const token = makeToken(userId);
    //console.log(token);

    res.status(200).json({ token, message: "SUCCESS" });
}

export async function getUser(req, res) {
    const userId = req.userId;

    const user = await userRepository.findById(userId)

    res.status(200).json({ name: user.name, address: user.address, message: "SUCCESS" });
}