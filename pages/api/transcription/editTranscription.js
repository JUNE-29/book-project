import { updateTrnascription } from '@/lib/db-util';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const transcriptionId = req.body.transcId;
        const color = req.body.colorHexCode;
        const bookPage = req.body.bookPage;
        const transcriptionContents = req.body.transcriptionContents;
        const editDate = req.body.editDate;
        const userEmail = req.body.userEmail;

        if (
            !transcriptionId ||
            !color ||
            !bookPage ||
            !transcriptionContents ||
            !editDate
        ) {
            res.status(422).json({ massage: 'invaild new review data' });
            return;
        }

        try {
            await updateTrnascription(
                transcriptionId,
                color,
                bookPage,
                transcriptionContents,
                editDate,
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
