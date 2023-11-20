import { printDateWithYYMMDD } from '../calculate/get-today';
import styles from './review_item.module.css';

export default function ReviewItem({ review }) {
    const {
        review_title: title,
        create_date: date,
        book_title: bookTitle,
    } = review;
    const emoji = String.fromCodePoint(`0x${review.emoji_unicode}`);

    return (
        <li className={styles.li}>
            <div className={styles.emojiBox}>
                <span className={styles.emoji}>{emoji}</span>
            </div>
            <div className={styles.titleBox}>
                <span className={styles.bookTitle}>{bookTitle}</span>
                <span className={styles.reviewTitle}>{title}</span>
            </div>
            <span className={styles.reviewDate}>
                {printDateWithYYMMDD(date)}
            </span>
        </li>
    );
}
