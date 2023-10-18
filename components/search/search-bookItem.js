import styles from './search-bookItem.module.css';

export default function SearchBookItem({ book }) {
    return (
        <li className={styles.li}>
            <div>
                <img
                    src={book.thumbnail}
                    className={styles.thumbnail}
                    alt='thumbnail'
                />
            </div>
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
