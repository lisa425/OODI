import { Review } from '../db/scema.js';

export async function createReview(userId, content, classId, classTimeId) {

    return Review.create({
        userId,
        content,
        lessonId: classId,
        lessonTimeId: classTimeId
    })
}