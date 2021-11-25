import express from 'express';
import * as reviewController from '../controller/reviewController.js';
import { isAuth } from '../middleware/isAuth.js';

const router = express.Router();

//POST 리뷰 작성 /review/
router.post('/', isAuth, reviewController.createReview);

//POST 클래스의 리뷰 전체 가져오기 /review
//router.post('/:classId', reviewController.getReviews)

export default router;