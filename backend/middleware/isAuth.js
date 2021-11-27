import jwt from 'jsonwebtoken'
import { config } from '../config.js';
import * as userRepository from '../data/user.js'

const AUTH_ERROR = { message: "Authentication error" }


export async function isAuth(req, res, next) {

    const authHeader = req.get('Authorization')
    //console.log(authHeader)
    if (!(authHeader && authHeader.startsWith('Bearer '))) {
        console.log("authHeader가 없거나, Bearer가 아닙니다")
        return res.status(401).json(AUTH_ERROR)
    }

    const token = authHeader.split(' ')[1];

    //console.log(token)

    jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
        if (error) {
            //console.log(error)
            return res.status(401).json(AUTH_ERROR)
        }

        const user = await userRepository.findById(decoded.id);

        if (!user) {
            //console.log(error)

            return res.status(401).json(AUTH_ERROR);
        }

        req.userId = user.id;

        next();
    })

}