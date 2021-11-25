import { User } from '../db/scema.js';
import { geocoder } from '../map/map.js';


export async function findById(id) {
    return User.findByPk(id)
}

export async function findByPhonenum(phonenum) {
    return User.findOne({ where: { phonenum } }).then(data => {
        return data.id;
    });
}

export async function createUser(user) {

    const loc = await geocoder.geocode(user.address)
        .then(res => {
            return [res[0].latitude, res[0].longitude]
        })
        .catch(err => {
            console.log("err: " + err);
        })

    return User.create({
        ...user,
        latitude: loc[0],
        longitude: loc[1],
    }).then(data => {
        return data.id;
    })
}