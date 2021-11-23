import { Timetable } from '../db/scema.js';




export async function setTimetable(time, userId) {
    let timeSet = ""

    for (var i = 0; i < time.length; i++) {

        var s = time[i].start.toString().slice(0, 2) + time[i].start.toString().slice(2)
        var e = time[i].end.toString().slice(0, 2) + time[i].end.toString().slice(2)

        var day = time[i].day
        if (timeSet == "") {
            timeSet = s + "~" + e + "~" + day;
        } else {
            timeSet = timeSet + ", " + s + "~" + e + "~" + day;
        }
    }

    Timetable.create({
        userId,
        time: timeSet
    })

}

export async function getTimetable(userId) {
    return Timetable.findOne({
        attributes: ['time'],
        where: { userId }
    })
}