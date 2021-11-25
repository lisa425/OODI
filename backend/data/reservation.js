import { Reservation } from "../db/scema.js"

export async function makeRsv(info) {
    return Reservation.create(info)
}