import * as reviewRepository from '../data/review.js';

export async function createReview(req, res) {
    const { content, classId, classTimeId } = req.body;
    const userId = req.userId;

    await reviewRepository.createReview(userId, content, classId, classTimeId);

    res.sendStatus(201);
}

// export async function getReviews(req, res) {
//     const {}
// }