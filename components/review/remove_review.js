import { removeReviewfromDB } from '@/lib/db-util';

export default function RemoveReviewFromList(reviewId, userEmail) {
    try {
        if (reviewId) {
            removeReviewfromDB(reviewId, userEmail);
            return 'success';
        } else {
            throw new Error('오류 발생: 리뷰 아이디 값이 없습니다.');
        }
    } catch (error) {
        console.error('오류 발생:', error);
    }
}
