import { editReview } from '@/lib/db-util';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const reviewId = req.body.reviewId;
        const reviewTitle = req.body.reviewTitle;
        const reviewContent = req.body.reviewContent;
        const emojiUniCode = req.body.emojiUniCode;
        const createdDate = req.body.createdDate;

        if (
            !reviewId ||
            !reviewTitle ||
            !reviewContent ||
            !emojiUniCode ||
            !createdDate
        ) {
            res.status(422).json({ massage: 'invaild new review data' });
            return;
        }

        try {
            await editReview(
                reviewId,
                reviewTitle,
                reviewContent,
                createdDate,
                emojiUniCode
            );
        } catch (error) {
            res.status(500).json({
                message: 'Inserting data failed!',
            });
            return;
        }

        res.status(201).json({ massage: 'Success!' });
    }
}
