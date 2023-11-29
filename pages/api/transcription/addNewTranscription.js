import { addTranscription } from '@/lib/db-util';
import { v4 as uuid } from 'uuid';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const transcriptionId = uuid();
        const color = req.body.colorHexCode;
        const bookPage = req.body.bookPage;
        const transcriptionContents = req.body.transcriptionContents;
        const userBookId = req.body.transcriptionContents;
        const bookTitle = req.body.bookTitle;
        const createdDate = req.body.createdDate;

        if (
            !transcriptionId ||
            !color ||
            !bookPage ||
            !transcriptionContents ||
            !userBookId ||
            !bookTitle ||
            !createdDate
        ) {
            res.status(422).json({ massage: 'invaild new review data' });
            return;
        }

        const newTranscription = {
            book_page: bookPage,
            book_title: bookTitle,
            color: color,
            create_date: createdDate,
            transcription_content: transcriptionContents,
            transcription_id: transcriptionId,
            user_book_id: userBookId,
        };

        try {
            await addTranscription(newTranscription);
        } catch (error) {
            res.status(500).json({
                message: 'Inserting data failed!',
            });
            return;
        }
        res.status(201).json({ massage: 'Success!' });
    }
}
