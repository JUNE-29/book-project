import UpdateDoneBook from '@/components/book/done_book_updating';
import getUserEmail from '@/components/calculate/get-user-email';
import { selectBookByBookId } from '@/lib/db-util';
import { getSession } from 'next-auth/react';

export default function UpdateReadBook(props) {
    const { book } = props;

    return <UpdateDoneBook book={book} />;
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
    const userEmail = getUserEmail(session.user.email);

    const userBookId = params.userBookId;
    const book = await selectBookByBookId(userBookId, userEmail);

    return {
        props: {
            book: book,
        },
    };
}
