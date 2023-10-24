import SearchBookItem from './search-bookItem';
import styles from './search-bookList.module.css';

export default function SearchBookList({ books, selectBook }) {
    return (
        <ul className={styles.list}>
            {books.documents.map((book) => {
                return (
                    <SearchBookItem
                        book={book}
                        selectBook={selectBook}
                        key={book.isbn + book.title.length}
                    />
                );
            })}
        </ul>
    );
}
