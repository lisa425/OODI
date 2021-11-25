import { LessonTime } from '../db/scema.js';


export async function createTime(time) {
    return LessonTime.create(time)
}