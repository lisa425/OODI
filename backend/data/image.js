import { Image } from '../db/scema.js';

export async function createImage(image) {
    return Image.create(image)
}