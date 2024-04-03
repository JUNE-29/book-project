import AddDoneBook from '@/components/book/done_book_adding';
import { getSession } from 'next-auth/react';

export default function AddReadBook(props) {
    const { book } = props;

    return <AddDoneBook book={book} />;
}

export async function getServerSideProps(context) {
    const { params } = context;
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/',
            },
        };
    }

    const book = params.slug;
    const bookTitle = book[0];
    const bookIsbn = book[1];

    return {
        props: {
            book: {
                bookTitle: bookTitle,
                bookIsbn: bookIsbn,
            },
        },
    };
}
