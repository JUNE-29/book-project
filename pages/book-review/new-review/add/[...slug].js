import { getSession } from 'next-auth/react';
import WriteReview from '@/components/review/write_review';

export default function AddNewReview(props) {
    const { book } = props;
    return <WriteReview book={book} />;
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    const { params } = context;

    if (!session) {
        return {
            redirect: {
                destination: '/',
            },
        };
    }

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
