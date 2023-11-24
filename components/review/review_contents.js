import { printDateWithYYMMDD } from '../calculate/get-today';
import styles from './review_contents.module.css';

export default function ReviewContetns({ review }) {
    const { createDate, reviewContent, reviewTitle } = review;
    return (
        <div className={styles.container}>
            <div className={styles.upperBox}>
                <span className={styles.title}>{reviewTitle} </span>
                <span className={styles.date}>
                    {printDateWithYYMMDD(createDate)}
                </span>
            </div>
            <div>
                <p className={styles.content}>{reviewContent}</p>
            </div>
        </div>
    );
}
