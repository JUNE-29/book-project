import { addReview } from '@/lib/db-util';
import { v4 as uuid } from 'uuid';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const reviewId = uuid();
        const reviewTitle = req.body.reviewTitle;
        const reviewContent = req.body.reviewContent;
        const userBookId = req.body.userBookId;
        const bookTitle = req.body.bookTitle;
        const emojiUniCode = req.body.emojiUniCode;
        const createdDate = req.body.createdDate;

        if (
            !reviewId ||
            !userBookId ||
            !reviewTitle ||
            !reviewContent ||
            !emojiUniCode ||
            !createdDate ||
            !bookTitle
        ) {
            res.status(422).json({ massage: 'invaild new review data' });
            return;
        }

        const newReview = {
            review_id: reviewId,
            review_title: reviewTitle,
            review_content: reviewContent,
            create_date: createdDate,
            emoji_unicode: emojiUniCode,
            user_book_id: userBookId,
            book_title: bookTitle,
        };

        try {
            await addReview(newReview);
        } catch (error) {
            res.status(500).json({
                message: 'Inserting data failed!',
            });
            return;
        }

        res.status(201).json({ massage: 'Success!' });
    }
}
