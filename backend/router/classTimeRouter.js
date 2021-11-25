import express from 'express'
import * as classTimeController from '../controller/classTimeController.js';


const router = express.Router();

//POST 클래스 타임 생성 /classTime
router.post('/', classTimeController.createTime);


export default router;