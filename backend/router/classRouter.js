import express from 'express';

import { isAuth } from '../middleware/isAuth.js';
import * as classController from '../controller/classController.js';

const router = express.Router();

//클래스 생성
//POST /class
router.post('/', classController.createClass)

//클래스 페이지 받기
//GET /class/:category/:subCategory/:type/:order
router.get('/:category/:sub/:type/:order', isAuth, classController.getClasses);

//클래스 페이지 + 가격순 방향
//GET /class/:category/:subCategory/:type/:order/:direction
router.get('/:category/:sub/:type/:order/:direction', isAuth, classController.getClasses);

//필터링 된 클래스 페이지 받기
//POST /class/:category/:subCategor/:typey/:order
router.post('/:category/:sub/:type/:order', isAuth, classController.getClassesWithFilter);

//필터링 된 클래스 페이지 + 가격순 방향
//POST /class/:category/:subCategory/:type/:order/:direction
router.post('/:category/:sub/:type/:order/:direction', isAuth, classController.getClassesWithFilter);

//클래스 이미지 받기
//GET /class/image/:category/:subCategory/:order
router.post('/image/', isAuth, classController.getImages)

//POST 클래스 상세 페이지 가져오기 /class/:classId
router.post('/:classId', isAuth, classController.getOneClass);

export default router;