import { getSocket } from "../socket/socket.js"

export async function sendSuggestion(req, res) {
    const message = req.body.message;

    const socketIO = getSocket()

    socketIO.emit('suggest', message)

    res.sendStatus(200)
}