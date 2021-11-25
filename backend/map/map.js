import nodeGeocoder from 'node-geocoder'
import { config } from '../config.js';

const options = {
    provider: 'google',

    apiKey: config.googleMap.apiKey,
}

export const geocoder = nodeGeocoder(options);