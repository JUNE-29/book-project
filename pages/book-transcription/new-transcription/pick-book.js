import { useState } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';

import { getDoneBooks } from '@/lib/db-util';
import PickDoneBookFromList from '@/components/book/pick_done_book';
import getUserEmail from '@/components/calculate/get-user-email';

export default function PickDoneBook(props) {
    const { books } = props;

    const [selectedBook, setSelectedBook] = useState();
    const selectBook = (book) => {
        setSelectedBook(book);
    };

    const router = useRouter();
    const pickABook = () => {
        const { bookTitle, userBookId } = selectedBook;

        selectedBook &&
            router.push(
                `/book-transcription/new-transcription/add/${userBookId}/${bookTitle}`
            );
    };

    return (
        <>
            <PickDoneBookFromList
                books={books}
                selectBook={selectBook}
                pickABook={pickABook}
            />
        </>
    );
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
    const books = await getDoneBooks(userEmail);
    return {
        props: { books: books },
    };
}
