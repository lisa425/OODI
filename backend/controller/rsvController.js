import * as rsvRepository from '../data/reservation.js';

export async function createReview(req, res) {
    const lessonId = req.params.classId;
    const ids = req.body.classTimeId;
    const listSD = req.body.startDate
    const userId = req.userId;

    let lessonTimeId = ""
    for (var id of ids) {
        if (lessonTimeId == "") lessonTimeId = id.toString()
        else lessonTimeId = lessonTimeId + ", " + id.toString()
    }

    let startDate = ""
    for (var date of listSD) {
        if (startDate == "") startDate = date.toString();
        else startDate = startDate + ", " + date.toString();

    }

    await rsvRepository.makeRsv({ userId, lessonId, lessonTimeId });

    res.sendStatus(201)
}