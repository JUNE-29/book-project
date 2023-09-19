import BookList from '@/components/bookList';
import { getDoneBook } from '@/lib/book-utils';

export default function readBooksList(props) {
    const { books } = props;
    return (
        <>
            <h1>ReadBooksList</h1>
            <BookList books={books} />
        </>
    );
}

export async function getStaticProps() {
    const books = await getDoneBook();

    return {
        props: {
            books: books,
        },
    };
}