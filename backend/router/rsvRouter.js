import express from 'express'

import * as rsvController from '../data/review.js';
import { isAuth } from '../middleware/isAuth.js';

const router = express.Router();

//POST 예약하기
router.post('/reservation/:classId', isAuth, rsvController.createReview);

export default router;