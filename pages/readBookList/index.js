import BookList from '@/components/book/bookList';
import BookCounting from '@/components/book/book_counting';
import BookNavigation from '@/components/book/book_navigation';
import { getDoneBook, getFilteredDoneBookCreatedYear } from '@/lib/book-utils';

export default function readBooksList(props) {
    const { books, filteredYear } = props;
    return (
        <>
            <BookNavigation />
            <BookCounting books={books} filteredYear={filteredYear} />
            <h1>ReadBooksList</h1>
            <BookList books={books} />
        </>
    );
}

export async function getStaticProps() {
    const books = await getDoneBook();
    const filteredYear = await getFilteredDoneBookCreatedYear();

    return {
        props: {
            books: books,
            filteredYear: filteredYear,
        },
    };
}
