import { validationResult } from 'express-validator';

export const validator = (req, res, next) => {
    const errors = validationResult(req)

    if (errors.isEmpty()) {
        return next();
    }

    console.log(errors.array()[0].msg);

    return res.status(400).json({ message: errors.array()[0].msg })
}

export const checkPhonenum = (value) => {
    const number = value.split("-")

    if (number.length == 3) return true
    else return false;
}

export const checkTimetable = (value) => {

    const timePattern = /^[0-2][0-9][0-5][0-9]$/
    const dayPattern = ["월", "화", "수", "목", "금", "토", "일"]

    let check = true;

    value.forEach(time => {
        if (!(timePattern.test(time.start) && timePattern.test(time.end) && dayPattern.includes(time.day))) {
            check = false;
        }
    });

    return check;
}
