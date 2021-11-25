import * as rsvRepository from '../data/reservation.js';

export async function createReview(req, res) {
    const lessonId = req.params.classId;
    const lessonTimeId = req.body.classTimeId;
    const userId = req.userId;

    await rsvRepository.makeRsv({ userId, lessonId, lessonTimeId });
}