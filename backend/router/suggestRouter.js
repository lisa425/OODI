import express from 'express'
import * as socketController from '../controller/socketController.js';

const router = express.Router();

router.post('/', socketController.sendSuggestion);

export default router;