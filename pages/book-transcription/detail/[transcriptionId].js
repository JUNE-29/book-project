import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';

import TranscriptionContents from '@/components/transcription/transcription_contents';
import removeTranscriptionFromList from '@/components/transcription/remove_transcription';
import { selectTransciptionByTranscId } from '@/lib/db-util';
import getUserEmail from '@/components/calculate/get-user-email';

import BackButton from '@/components/ui/back-button';
import Button from '@/components/ui/button';

import styles from '../../../styles/book-detail-page.module.css';

export default function TranscriptionDetail(props) {
    const { transcription, userEmail } = props;
    const router = useRouter();

    const goToList = () => {
        router.push('/book-transcription');
    };

    const editTranscription = () => {
        router.push(
            `/book-transcription/edit-transcription/${transcription.transcription_id}`
        );
    };
    const removeTranscription = async () => {
        if (confirm('필사를 삭제하시겠습니까?')) {
            const transcId = transcription.transcription_id;
            const result = await removeTranscriptionFromList(
                transcId,
                userEmail
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
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: '/',
            },
        };
    }
    const userEmail = getUserEmail(session.user.email);
    const { params } = context;
    const transcId = params.transcriptionId;
    const transcription = await selectTransciptionByTranscId(
        transcId,
        userEmail
    );

    return {
        props: {
            transcription: transcription[0],
            userEmail: userEmail,
        },
    };
}
