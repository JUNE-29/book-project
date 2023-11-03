import NoImage from '../ui/no-image';
import styles from './book-detail.module.css';

export default function BookDetail({ book }) {
    const datetime = book.datetime;
    const date = datetime.slice(0, 10);

    return (
        <div className={styles.container}>
            <div>
                {book.thumbnail ? (
                    <img
                        className={styles.thumbnail}
                        src={book.thumbnail}
                        alt='thumbnail'
                    ></img>
                ) : (
                    <NoImage />
                )}
            </div>
            <div className={styles.infoBox}>
                <h3 className={styles.title}>{book.title}</h3>
                <span className={styles.authors}>
                    {book.authors.join(', ')}
                </span>
                <span className={styles.division}> | </span>
                <span className={styles.publisher}>{book.publisher}</span>
                <span className={styles.division}> | </span>
                <span className={styles.datetime}>{date}</span>
                <h4 className={styles.contentsTitle}>책소개</h4>
                <p className={styles.contents}>
                    {book.contents ? book.contents : '책소개가 없습니다.'}
                </p>
            </div>
        </div>
    );
}
