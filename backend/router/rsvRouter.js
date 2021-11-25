import express from 'express'

import * as rsvController from '../controller/rsvController.js';
import { isAuth } from '../middleware/isAuth.js';

const router = express.Router();

//POST 예약하기 /reservation/:classId
router.post('/:classId', isAuth, rsvController.createReview);

export default router;