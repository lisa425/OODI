import express from 'express';
import * as reviewController from '../controller/reviewController.js';
import { isAuth } from '../middleware/isAuth.js';

const router = express.Router();

//리뷰 작성
router.post('/', isAuth, reviewController.createReview);

//클래스의 리뷰 전체 가져오기

export default router;