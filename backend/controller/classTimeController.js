import express from 'express'
import * as timeRepository from '../data/classTime.js';


export async function createTime(req, res) {
    await timeRepository.createTime(req.body);

    res.sendStatus(201)
}