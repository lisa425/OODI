import { LessonTime } from '../db/scema.js';


export async function createTime(classTime) {
    return LessonTime.create(classTime)
}