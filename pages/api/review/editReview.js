import { updateReview } from '@/lib/db-util';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const reviewId = req.body.reviewId;
        const reviewTitle = req.body.reviewTitle;
        const reviewContent = req.body.reviewContent;
        const emojiUniCode = req.body.emojiUniCode;
        const editDate = req.body.editDate;
        const userEmail = req.body.userEmail;

        if (
            !reviewId ||
            !reviewTitle ||
            !reviewContent ||
            !emojiUniCode ||
            !editDate
        ) {
            res.status(422).json({ massage: 'invaild new review data' });
            return;
        }

        try {
            await updateReview(
                reviewId,
                reviewTitle,
                reviewContent,
                editDate,
                emojiUniCode,
                userEmail
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
