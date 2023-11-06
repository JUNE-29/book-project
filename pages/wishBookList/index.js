import { useRouter } from 'next/router';

import { getWishBooks } from '@/lib/db-util';

import BookList from '@/components/book/bookList';
import BookCounting from '@/components/book/book_counting';
import BookNavigation from '@/components/book/book_navigation';

export default function WishBookList(props) {
    const { books } = props;

    const router = useRouter();
    const goToDetail = (userBookId) => {
        router.push(`/wishBookList/detail/${userBookId}`);
    };

    const selectBook = (book) => {
        if (book) {
            const userBookId = book.user_book_id;
            goToDetail(userBookId);
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
