import { getSession } from 'next-auth/react';
import WriteTranscription from '@/components/transcription/write_transcription';
import { selectTransciptionByTranscId } from '@/lib/db-util';
import getUserEmail from '@/components/calculate/get-user-email';

export default function EditTranscription(props) {
    const { transcription, book } = props;

    return <WriteTranscription book={book} transcription={transcription} />;
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: '/',
            },
        };
    }
    const userEmail = getUserEmail(session.user.email);

    const { params } = context;
    const transcId = params.transcriptionId;
    const transcription = await selectTransciptionByTranscId(
        transcId,
        userEmail
    );

    return {
        props: {
            transcription: {
                transcId: transcId,
                transcContent: transcription[0].transcription_content,
                color: transcription[0].color,
                bookPage: transcription[0].book_page,
            },
            book: {
                userBookId: transcription[0].user_book_id,
                bookTitle: transcription[0].book_title,
            },
        },
    };
}
