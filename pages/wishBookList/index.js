import { useRouter } from 'next/router';

import { getWishBooks } from '@/lib/db-util';

import BookList from '@/components/book/bookList';
import BookCounting from '@/components/book/book_counting';
import BookNavigation from '@/components/book/book_navigation';

export default function WishBookList(props) {
    const { books } = props;

    const router = useRouter();
    const goToDetail = (isbn) => {
        router.push(`/wishBookList/detail/${isbn}`);
    };

    const selectBook = (book) => {
        if (book) {
            const isbn = book.book_isbn;
            const splittedIsbn = isbn.split(' ');
            splittedIsbn[0]
                ? goToDetail(splittedIsbn[0])
                : goToDetail(splittedIsbn[1]);
        }
    };
    return (
        <>
            <BookNavigation />
            <BookCounting books={books} />
            <BookList books={books} selectBook={selectBook} />
        </>
    );
}

export async function getStaticProps() {
    const books = await getWishBooks();

    return {
        props: {
            books: books,
        },
    };
}
