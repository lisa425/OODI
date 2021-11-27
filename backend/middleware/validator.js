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
    let number
    number = value.split("-")


    if (number.length == 3) return true
    else return false;
}
