import express from 'express';
import { body } from 'express-validator';

import * as userController from '../controller/userController.js';
import { isAuth } from '../middleware/isAuth.js';
import { validator, checkPhonenum } from '../middleware/validator.js';


const router = express.Router();

const validatePhoneNum = [
    body('phonenum')
        .trim()
        .notEmpty()
        .isString()
        .custom(checkPhonenum)
        .withMessage("phonenum must be form of phone number(000-0000-0000)"),

    validator
]

const validateSignup = [
    ...validatePhoneNum,

    body('name')
        .trim()
        .notEmpty()
        .withMessage("이름을 입력해주세요")
        .isString()
        .withMessage("이름은 String 타입이어야 합니다"),

    body('address')
        .trim()
        .notEmpty()
        .withMessage("주소를 입력해주세요")
        .isString()
        .withMessage("주소는 String 타입이어야 합니다"),

    validator
]

//GET 사용자정보 가져오기 /user/
router.get('/', isAuth, userController.getUser)

//POST 로그인 /user/login
router.post('/login', validatePhoneNum, userController.login);

//POST 회원가입 /user/signup
router.post('/signup', validateSignup, userController.signup);



export default router;
