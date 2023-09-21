import BookList from '@/components/book/bookList';
import BookNavigation from '@/components/book/book_navigation';
import { getWishBook } from '@/lib/book-utils';

export default function WishBookList(props) {
    const { books } = props;
    return (
        <>
            <BookNavigation />
            <h1>WishBooksList</h1>
            <BookList books={books} />
        </>
    );
}

export async function getStaticProps() {
    const books = await getWishBook();

    return {
        props: {
            books: books,
        },
    };
}
