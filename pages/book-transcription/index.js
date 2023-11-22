import TranscriptionList from '@/components/transcription/transcription_list';
import { getAllTranscriptions } from '@/lib/db-util';

import styles from '../../styles/book-review-page.module.css';

export default function Transcription(props) {
    const { transcriptions } = props;
    return (
        <div className={styles.container}>
            <div className={styles.buttonBox}>
                <button className={styles.button}>필사하기</button>
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
