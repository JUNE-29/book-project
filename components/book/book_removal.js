import { removeBookfromDB } from '@/lib/db-util';

export default async function RemoveBookfromBookList(props) {
    const userBookId = props;

    try {
        if (userBookId) {
            removeBookfromDB(userBookId);
            return 'success';
        } else {
            throw new Error('오류 발생: 책 아이디 값이 없습니다.');
        }
    } catch (error) {
        console.error('오류 발생:', error);
    }
}
