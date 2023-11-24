import ReviewItem from './review_item';

import styles from './review_list.module.css';

export default function ReviewList({ reviews, selectReview }) {
    return (
        <div className={styles.container}>
            <ul className={styles.reviewList}>
                {reviews.map((review) => (
                    <ReviewItem
                        review={review}
                        key={review.review_id}
                        selectReview={selectReview}
                    />
                ))}
            </ul>
        </div>
    );
}
