import styles from './transcription_item.module.css';

export default function TranscriptionItem({ transcription }) {
    const {
        book_title: bookTitle,
        book_page: page,
        color,
        transcription_content: contents,
    } = transcription;

    const isDarkBackground = isDark(color);
    const textColor = isDarkBackground ? '#FFFFFF' : '#000000';

    const bgcolor = {
        backgroundColor: `#${color}`,
        color: textColor,
    };

    return (
        <li className={styles.li} style={bgcolor}>
            <div className={styles.upperBox}>
                <p>
                    {contents.length > 100
                        ? `${contents.substring(0, 99)}..`
                        : `${contents}`}
                </p>
            </div>
            <div className={styles.lowerBox}>
                <span className={styles.title}>{bookTitle}</span>
                <span>p {page}</span>
            </div>
        </li>
    );
}

const isDark = (color) => {
    // 간단한 로직으로 어두운지 밝은지 판단
    // 이 로직은 실제로 사용하는 환경에 따라 조절할 수 있습니다.
    const rgb = parseInt(color.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness < 129; // 예시로 밝기 129을 기준으로 어두운지 판단
};
