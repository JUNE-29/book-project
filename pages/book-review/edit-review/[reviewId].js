import getUserEmail from '@/components/calculate/get-user-email';
import WriteReview from '@/components/review/write_review';
import { selectReviewByReviewId } from '@/lib/db-util';
import { getSession } from 'next-auth/react';

export default function EditReview(props) {
    const { review, book } = props;

    return <WriteReview book={book} review={review} />;
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    const { params } = context;

    if (!session) {
        return {
            redirect: {
                destination: '/',
            },
        };
    }
    const userEmail = getUserEmail(session.user.email);

    const reviewId = params.reviewId;
    const review = await selectReviewByReviewId(reviewId, userEmail);

    return {
        props: {
            review: {
                reviewId: reviewId,
                reviewTitle: review[0].review_title,
                reviewContent: review[0].review_content,
            },
            book: {
                userBookId: review[0].user_book_id,
                bookTitle: review[0].book_title,
            },
        },
    };
}
