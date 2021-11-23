import express from 'express';

import { isAuth } from '../middleware/isAuth.js';
import * as classController from '../controller/classController.js';

const router = express.Router();

//클래스 생성
//POST /class
router.post('/', classController.createClass)

//클래스 페이지 받기
//GET /class/:category/:subCategory
router.get('/:category/:sub/:order', isAuth, classController.getClasses);

//클래스 이미지 받기
//GET /class/image/:category/:subCategory
router.get('/image/:category/:subCategory', isAuth, classController.getImages)

//필터링 된 클래스 페이지 받기
//POST /class/:category/:subCategory
router.post('/:category/:sub/:order', isAuth, classController.getClassesWithFilter);

//필터링 된 클래스 이미지 받기
//POST /class/image/:category/:subCategory
router.post('/image/:category/:sub/:order', isAuth, classController.getImagesWithFilter);


export default router;