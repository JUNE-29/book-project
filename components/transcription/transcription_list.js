import TranscriptionItem from './transcription_item';
import styles from './transcription_list.module.css';

export default function TranscriptionList({ transcriptions }) {
    return (
        <div className={styles.container}>
            <ul className={styles.transcriptionList}>
                {transcriptions.map((transcription) => (
                    <TranscriptionItem
                        transcription={transcription}
                        key={transcription.transcription_id}
                    />
                ))}
            </ul>
        </div>
    );
}
