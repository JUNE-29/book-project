import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';

import TranscriptionList from '@/components/transcription/transcription_list';
import { getAllTranscriptions } from '@/lib/db-util';

import styles from '../../styles/book-review-page.module.css';
import getUserEmail from '@/components/calculate/get-user-email';

export default function Transcription(props) {
    const { transcriptions } = props;
    const router = useRouter();

    const selectTranscription = (contents) => {
        if (contents.transcription_id) {
            router.push(
                `/book-transcription/detail/${contents.transcription_id}`
            );
        }
    };
    return (
        <div className={styles.container}>
            <div className={styles.buttonBox}>
                <button
                    className={styles.button}
                    onClick={() =>
                        router.push(
                            '/book-transcription/new-transcription/pick-book'
                        )
                    }
                >
                    필사하기
                </button>
            </div>
            <TranscriptionList
                transcriptions={transcriptions}
                selectTranscription={selectTranscription}
            />
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
    const transcriptions = await getAllTranscriptions(userEmail);
    return {
        props: { transcriptions: transcriptions },
    };
}
