import { useQueries } from '@tanstack/react-query';

import KaKaoAPI from '@/lib/kakaoAPI-utils';
import DoneBookList from '../review/done_book_list';

export default function PickDoneBookFromList({ books, selectBook, pickABook }) {
    // 여기서 읽은 책 고르기
    //const { books } = props;

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

    return (
        <DoneBookList
            selectBook={selectBook}
            books={doneBooks}
            pickABook={pickABook}
        />
    );
}
