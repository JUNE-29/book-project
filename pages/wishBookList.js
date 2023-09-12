import BookList from '@/components/bookList';
import { getWishBook } from '@/lib/book-utils';

export default function WishBookList(props) {
    const { books } = props;
    return (
        <>
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
