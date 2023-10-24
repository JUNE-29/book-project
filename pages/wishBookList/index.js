import BookList from '@/components/book/bookList';
import BookCounting from '@/components/book/book_counting';
import BookNavigation from '@/components/book/book_navigation';
import { getWishBooks } from '@/lib/db-util';

export default function WishBookList(props) {
    const { books } = props;
    return (
        <>
            <BookNavigation />
            <BookCounting books={books} />
            <BookList books={books} />
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
