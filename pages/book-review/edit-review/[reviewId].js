import WriteReview from '@/components/review/write_review';
import { selectReviewByReviewId } from '@/lib/db-util';

export default function EditReview(props) {
    const { review, book } = props;

    return <WriteReview book={book} review={review} />;
}

export async function getServerSideProps(context) {
    const { params } = context;
    const reviewId = params.reviewId;
    const review = await selectReviewByReviewId(reviewId);

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
