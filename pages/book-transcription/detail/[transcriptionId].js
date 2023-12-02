import TranscriptionContents from '@/components/transcription/transcription_contents';
import { selectTransciptionByTranscId } from '@/lib/db-util';

import BackButton from '@/components/ui/back-button';
import Button from '@/components/ui/button';

import styles from '../../../styles/book-detail-page.module.css';
import { useRouter } from 'next/router';
import removeTranscriptionFromList from '@/components/transcription/remove_transcription';

export default function TranscriptionDetail(props) {
    const { transcription } = props;
    const router = useRouter();

    const goToList = () => {
        router.push('/book-transcription');
    };

    const editTranscription = () => {
        router.push(
            `/book-transcription/edit-transcription/${transcription.transcription_id}`
        );
    };
    const removeTranscription = () => {
        if (confirm('필사를 삭제하시겠습니까?')) {
            const result = removeTranscriptionFromList(
                transcription.transcription_id
            );

            if (result === 'success') {
                alert('필사를 삭제했습니다.');
                goToList();
            }
        } else {
            return;
        }
    };

    return (
        <div className={styles.layout}>
            <BackButton text='목록으로 가기' onClick={goToList} />
            <TranscriptionContents contents={transcription} />
            <div className={styles.btnlayout}>
                <Button text='수정하기' onClick={editTranscription} />
                <Button text='삭제하기' onClick={removeTranscription} />
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const { params } = context;
    const transcId = params.transcriptionId;
    const transcription = await selectTransciptionByTranscId(transcId);

    return {
        props: {
            transcription: transcription[0],
        },
    };
}
