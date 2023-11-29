import { useState } from 'react';
import { useRouter } from 'next/router';
import { getDoneBooks } from '@/lib/db-util';
import PickDoneBookFromList from '@/components/book/pick_done_book';

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

export async function getStaticProps() {
    const books = await getDoneBooks();
    return {
        props: { books: books },
    };
}
