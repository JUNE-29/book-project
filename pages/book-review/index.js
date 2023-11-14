import ReviewList from '@/components/review/review_list';
import { getAllReviews } from '@/lib/db-util';

export default function reviewList(props) {
    const { reviews } = props;

    return <ReviewList reviews={reviews} />;
}

export async function getStaticProps() {
    const reviews = await getAllReviews();
    return {
        props: { reviews: reviews },
    };
}
