import React from 'react';
import { printDateWithYYMMDD } from '../calculate/get-today';
import styles from './review_contents.module.css';

export default function ReviewContetns({ review }) {
    const { createDate, reviewContent, reviewTitle } = review;
    const content = formatTextWithBr(reviewContent);
    return (
        <div className={styles.container}>
            <div className={styles.upperBox}>
                <span className={styles.title}>{reviewTitle} </span>
                <span className={styles.date}>
                    {printDateWithYYMMDD(createDate)}
                </span>
            </div>
            <div>
                <p className={styles.content}>{content}</p>
            </div>
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
