import NoImage from '../ui/no-image';
import styles from './search-bookItem.module.css';

export default function SearchBookItem({ book, selectBook }) {
    return (
        <li
            key={book.isbn}
            className={styles.li}
            onClick={() => selectBook(book)}
        >
            {book.thumbnail ? (
                <div>
                    <img
                        src={book.thumbnail}
                        className={styles.thumbnail}
                        alt='thumbnail'
                    />
                </div>
            ) : (
                <NoImage />
            )}
            <div className={styles.info}>
                <h3 className={styles.title}>{book.title}</h3>
                <p className={styles.authors}>{book.authors}</p>
                <p className={styles.contents}>
                    {book.contents.length > 100
                        ? `${book.contents.slice(0, 100)}...`
                        : book.contents}
                </p>
            </div>
        </li>
    );
}
