import { getSession } from 'next-auth/react';
import WriteTranscription from '@/components/transcription/write_transcription';

export default function AddNewTranscription(props) {
    const { book } = props;
    return <WriteTranscription book={book} />;
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

    const { params } = context;
    const book = params.slug;
    const userBookId = book[0];
    const bookTitle = book[1];

    return {
        props: {
            book: {
                bookTitle: bookTitle,
                userBookId: userBookId,
            },
        },
    };
}
