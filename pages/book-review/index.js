import ReviewList from '@/components/review/review_list';
import { getAllReviews } from '@/lib/db-util';

import styles from '../../styles/book-review-page.module.css';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import getUserEmail from '@/components/calculate/get-user-email';

export default function reviewList(props) {
    const { reviews } = props;
    const router = useRouter();

    const goToAddingNewReview = () => {
        router.push('/book-review/new-review/pick-book');
    };

    const selectReview = (review) => {
        if (review.review_id) {
            router.push(`/book-review/detail/${review.review_id}`);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.buttonBox}>
                <button className={styles.button} onClick={goToAddingNewReview}>
                    감상문 쓰기
                </button>
            </div>
            <ReviewList reviews={reviews} selectReview={selectReview} />
        </div>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: '/',
            },
        };
    }

    const userEmail = getUserEmail(session.user.email);

    const reviews = await getAllReviews(userEmail);

    return {
        props: { reviews: reviews },
    };
}
