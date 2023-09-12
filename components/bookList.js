import BookItem from './bookItem';

export default function BookList({ books }) {
    return (
        <ul>
            {books.map((book) => (
                <BookItem book={book} key={book.user_book_id} />
            ))}
        </ul>
    );
}
