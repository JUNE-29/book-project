import { removeTranscriptionFromDB } from '@/lib/db-util';

export default function removeTranscriptionFromList(props) {
    const transcId = props;

    try {
        if (transcId) {
            removeTranscriptionFromDB(transcId);
            return 'success';
        } else {
            throw new Error('오류 발생: 리뷰 아이디 값이 없습니다.');
        }
    } catch (error) {
        console.error('오류 발생:', error);
    }
}
