import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { config } from './config.js';
import { sequelize } from './db/database.js';
import userRouter from './router/userRouter.js';
import timetableRouter from './router/timetableRouter.js';
import classRouter from './router/classRouter.js';
import imageRouter from './router/imageRouter.js';
import classTimeRouter from './router/classTimeRouter.js';

import path from 'path'
console.log("------------------")
const __dirname = path.resolve()
console.log(__dirname)
console.log("------------------")


const app = express();
const router = express.Router();

app.use(express.json());
app.use(cors());
app.use(helmet());


//test
app.use('/test', router.get('/', (req, res) => {
    res.status(200).json({ message: "connected! :D" });
}))

//회원 관련 전반
app.use('/user', userRouter);

//시간표 관련 전반
app.use('/timetable', timetableRouter);

//카테고리 관련 전반
app.use('/class', classRouter);

//이미지 관련 전반
app.use('/image', imageRouter);

//클래스 타임 관련 전반
app.use('/classTime', classTimeRouter);



app.use((req, res, next) => {
    res.status(404).json({ message: "Wrong URL" })
})

app.use((error, req, res, next) => {
    console.log(error);

    res.status(500).json({ error });
})

sequelize.sync().then(() => {
    console.log(`connected! ..... ${new Date()}`);
    const server = app.listen(8080);

})
