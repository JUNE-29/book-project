import BookItem from './bookItem';
import styles from './bookList.module.css';

export default function BookList({ books }) {
    return (
        <div className={styles.div}>
            <ul className={styles.ul}>
                {books.map((book, index) => {
                    let bookNumber = index;
                    return (
                        <BookItem
                            book={book}
                            bookNumber={bookNumber}
                            key={book.book_isbn + bookNumber}
                        />
                    );
                })}
            </ul>
        </div>
    );
}
