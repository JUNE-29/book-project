import BookList from '@/components/book/bookList';
import BookCounting from '@/components/book/book_counting';
import BookNavigation from '@/components/book/book_navigation';
import { getFilteredDoneBookCreatedYear } from '@/lib/book-utils';
import { getDoneBooks } from '@/lib/db-util';
import { useRouter } from 'next/router';

export default function readBooksList(props) {
    const { books, filteredYear } = props;

    const router = useRouter();

    const goToDetail = (userBookId) => {
        router.push(`/readBookList/detail/${userBookId}`);
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
            <BookCounting books={books} filteredYear={filteredYear} />
            <BookList books={books} selectBook={selectBook} />
        </>
    );
}

export async function getStaticProps() {
    const books = await getDoneBooks();
    const filteredYear = await getFilteredDoneBookCreatedYear();
    return {
        props: { books: books, filteredYear: filteredYear },
    };
}
