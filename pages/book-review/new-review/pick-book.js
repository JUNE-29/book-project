import DoneBookList from '@/components/review/done_book_list';
import { useQueries } from '@tanstack/react-query';

import { getDoneBooks } from '@/lib/db-util';
import KaKaoAPI from '@/lib/kakaoAPI-utils';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function PickDoneBook(props) {
    // 여기서 읽은 책 고르기
    const { books } = props;

    const kakaoApi = new KaKaoAPI();
    const result = useQueries({
        queries: books.map((book) => ({
            queryKey: ['book', book.book_isbn],
            queryFn: () => kakaoApi.searchByIsbn(book.book_isbn),
            staleTime: 1000 * 60 * 360,
        })),
    });

    const doneBooks = [];
    books &&
        books.map((book) => {
            doneBooks.push({
                bookTitle: book.book_title,
                userBookId: book.user_book_id,
                isbn: book.book_isbn,
            });
        });

    const kakaoBooks = [];
    result.map(
        (book) =>
            book.data &&
            kakaoBooks.push({
                isbn: book.data.documents[0].isbn,
                thumbnail: book.data.documents[0].thumbnail,
            })
    );

    doneBooks.forEach((doneBook) => {
        const machingBook = kakaoBooks.find(
            (kakaoBook) => kakaoBook.isbn === doneBook.isbn
        );
        if (machingBook) {
            doneBook.thumbnail = machingBook.thumbnail;
        }
    });

    const [selectedBook, setSelectedBook] = useState();
    const selectBook = (book) => {
        setSelectedBook(book);
    };

    const router = useRouter();
    const pickABook = () => {
        const { bookTitle, userBookId } = selectedBook;

        selectedBook &&
            router.push(
                `/book-review/new-review/add/${userBookId}/${bookTitle}`
            );
    };

    return (
        <DoneBookList
            selectBook={selectBook}
            books={doneBooks}
            pickABook={pickABook}
        />
    );
}

export async function getStaticProps() {
    const books = await getDoneBooks();
    return {
        props: { books: books },
    };
}
