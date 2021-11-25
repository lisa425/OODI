import { Timetable } from '../db/scema.js';


export async function setTimetable(time, userId) {

    let originTime = ""
    let continuous = ""

    const exist = await getTimetable(userId);

    if (exist) {
        await Timetable.destroy({ where: { userId } })
    }

    for (var timeSet of time) {
        var start = 0
        var end = 0
        var day = timeSet.day;
        var timeList = timeSet.timeList;

        var oneString = day
        var oneCtn = ""
        for (var one of timeList) {
            oneString = oneString + "-" + one

            if (start == 0) { start = end = one }
            else if (one - end == 100) { end = one }
            else {
                if (end == 0) { end = start }
                end += 100

                if (start < 1000) { start = "0" + start }
                if (end < 1000) { end = "0" + end }

                var tmp = day + "~" + start + "~" + end
                if (oneCtn == "") { oneCtn = tmp }
                else { oneCtn = oneCtn + ", " + tmp }

                start = end = one
            }
        }

        if (end == 0) { end = start }
        end += 100
        var tmp = day + "~" + start + "~" + end
        if (oneCtn == "") { oneCtn = tmp }
        else { oneCtn = oneCtn + ", " + tmp }

        if (originTime == "") { originTime = oneString }
        else { originTime = originTime + ", " + oneString }

        if (continuous == "") { continuous = oneCtn }
        else { continuous = continuous + ", " + oneCtn }

    }

    Timetable.create({
        userId,
        time: originTime,
        continuousTime: continuous,
    })

}

export async function getTimetable(userId) {
    return Timetable.findOne({
        attributes: ['time', 'continuousTime'],
        where: { userId }
    })
}