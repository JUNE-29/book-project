import BookList from '@/components/book/bookList';
import BookCounting from '@/components/book/book_counting';
import BookNavigation from '@/components/book/book_navigation';
import { getWishBook } from '@/lib/book-utils';

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
    const books = await getWishBook();

    return {
        props: {
            books: books,
        },
    };
}
