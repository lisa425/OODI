import * as rsvRepository from '../data/reservation.js';

export async function createReview(req, res) {
    const lessonId = req.params.classId;
    const ids = req.body.classTimeId;
    const startDate = req.body.startDate
    const userId = req.userId;

    let lessonTimeId = ""
    for (var id of ids) {
        if (lessonTimeId == "") lessonTimeId = id.toString()
        else lessonTimeId = lessonTimeId + ", " + id.toString()
    }

    await rsvRepository.makeRsv({ userId, lessonId, lessonTimeId, startDate });

    res.sendStatus(201)
}