import express from 'express'
import * as imageController from '../controller/imageController.js';

const router = express.Router();

//POST 이미지 생성 /image/
router.post('/', imageController.createImage)

export default router;