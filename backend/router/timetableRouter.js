import express from 'express';
import { body } from 'express-validator';

import * as tableController from '../controller/tableController.js';
import { isAuth } from '../middleware/isAuth.js';
import { validator } from '../middleware/validator.js';

const router = express.Router();

const validateTime = [
    body('time')
        .notEmpty()
        .withMessage("시작 시간을 입력해주세요")
        .isArray()
        .withMessage("시간표는 배열형식이어야 합니다"),

    validator
]

//POST 시간표 입력 /timetable/setTable
router.post('/setTable', validateTime, isAuth, tableController.setTimetable);

//GET 시간 가져오기 /timetable/getTime
router.get('/getTime', isAuth, tableController.getTime)

//GET 시간표 가져오기 /timetable/getTable
router.get('/getTable', isAuth, tableController.getTable)

export default router;