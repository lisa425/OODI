import { getSocket } from "../socket/socket.js"
import * as classRepository from '../data/classes.js';

export async function sendSuggestion(req, res) {
    const { message, classId } = req.body;
    const price = [0, 10000000]

    const lesson = await classRepository.findOneClass(classId, price);

    const title = lesson.dataValues.title;

    const suggest = {
        message,
        classId,
        title,
    }

    const socketIO = getSocket()

    res.sendStatus(200)
    socketIO.emit('suggest', suggest)

}