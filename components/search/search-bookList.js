import SearchBookItem from './search-bookItem';
import styles from './search-bookList.module.css';

export default function SearchBookList({ books }) {
    return (
        <ul className={styles.list}>
            {books.documents.map((book) => (
                <SearchBookItem book={book} key={book.isbn} />
            ))}
        </ul>
    );
}
