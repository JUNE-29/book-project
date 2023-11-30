import React from 'react';
import { printDateWithYYMMDD } from '../calculate/get-today';

import styles from './transcription_contents.module.css';

export default function TranscriptionContents({ contents }) {
    const {
        book_title: bookTitle,
        create_date: date,
        color,
        book_page: page,
        transcription_content: transcContent,
    } = contents;

    const content = formatTextWithBr(transcContent);

    const isDarkBackground = isDark(color);
    const textColor = isDarkBackground ? '#FFFFFF' : '#000000';

    const bgcolor = {
        backgroundColor: color,
        color: textColor,
    };

    return (
        <div className={styles.container} style={bgcolor}>
            <div className={styles.upperBox}>
                <span className={styles.bookTitle}>{bookTitle}</span>
                <span>{printDateWithYYMMDD(date)}</span>
            </div>
            <p className={styles.page}>p {page}</p>
            <p className={styles.content}>{content}</p>
        </div>
    );
}

function formatTextWithBr(text) {
    const lines = text.split('\n');
    return lines.map((line, index) => (
        <React.Fragment key={index}>
            {line}
            {index !== lines.length - 1 && <br />}
        </React.Fragment>
    ));
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
