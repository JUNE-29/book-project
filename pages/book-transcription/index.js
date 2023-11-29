import { useRouter } from 'next/router';
import TranscriptionList from '@/components/transcription/transcription_list';
import { getAllTranscriptions } from '@/lib/db-util';

import styles from '../../styles/book-review-page.module.css';

export default function Transcription(props) {
    const { transcriptions } = props;
    const router = useRouter();
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
            <TranscriptionList transcriptions={transcriptions} />
        </div>
    );
}

export async function getStaticProps() {
    const transcriptions = await getAllTranscriptions();
    return {
        props: { transcriptions: transcriptions },
    };
}
