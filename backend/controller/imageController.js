import express from 'express'
import * as imageRepository from '../data/image.js';


export async function createImage(req, res) {
    await imageRepository.createImage(req.body);

    res.sendStatus(200);
}