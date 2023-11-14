import ReviewItem from './review_item';

import styles from './review_list.module.css';

export default function ReviewList({ reviews }) {
    return (
        <div className={styles.container}>
            <ul className={styles.reviewList}>
                {reviews.map((review) => (
                    <ReviewItem review={review} key={review.review_id} />
                ))}
            </ul>
        </div>
    );
}
