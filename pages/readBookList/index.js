import BookList from '@/components/book/bookList';
import BookCounting from '@/components/book/book_counting';
import BookNavigation from '@/components/book/book_navigation';
import { getDoneBook } from '@/lib/book-utils';
import { getFilteredDate } from '@/lib/book-utils';

export default function readBooksList(props) {
    const { books, filteredDate } = props;
    return (
        <>
            <BookNavigation />
            <BookCounting books={books} filteredDate={filteredDate} />
            <h1>ReadBooksList</h1>
            <BookList books={books} />
        </>
    );
}

export async function getStaticProps() {
    const books = await getDoneBook();
    const filteredDate = await getFilteredDate();

    return {
        props: {
            books: books,
            filteredDate: filteredDate,
        },
    };
}
