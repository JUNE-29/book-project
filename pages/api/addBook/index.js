import { v4 as uuid } from 'uuid';

import { addNewBook } from '@/lib/db-util';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const bookId = uuid(); //user-book-id 생성
        const bookIsbn = req.body.bookIsbn;
        const bookTitle = req.body.bookTitle;
        const createdDate = req.body.createdDate;
        const doneDate = req.body.doneDate;
        const starScore = req.body.score;
        const status = req.body.status;

        if (!bookId || !bookIsbn || !bookTitle || !createdDate) {
            res.status(422).json({ massage: 'invaild new book data' });
            return;
        }

        const newBook = {
            user_book_id: bookId,
            book_isbn: bookIsbn,
            book_title: bookTitle,
            user_book_create_date: createdDate,
            user_book_done_date: doneDate,
            user_book_star_score: starScore,
            user_book_status: status,
        };

        try {
            await addNewBook(newBook);
        } catch (error) {
            res.status(500).json({
                message: 'Inserting data failed!',
            });
            return;
        }

        res.status(201).json({ massage: 'Success!' });
    }
}
