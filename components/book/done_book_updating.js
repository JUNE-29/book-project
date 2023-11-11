import { useRef, useState } from 'react';

import Button from '../ui/button';
import { HeartRating } from '../ui/rating';
import styles from './done_book_updating.module.css';
import { updateDoneBook } from '@/lib/db-util';
import { useRouter } from 'next/router';

export default function UpdateDoneBook({ book }) {
    const {
        user_book_id: userBookId,
        book_title: bookTitle,
        user_book_done_date: doneDate,
    } = book[0];

    const router = useRouter();

    const [date, setDoneDate] = useState(doneDate);

    let rate = null;
    const getRateValue = (rateValue) => {
        rate = rateValue;
    };
    const onClick = async () => {
        const doneDate = date;
        const updatedDate = getToday();
        if (doneDate === '') {
            alert('다 읽은 날짜를 입력해주세요!');
            return;
        } else if (rate === 0) {
            alert('책에 대한 점수를 입력해주세요!');
            return;
        }

        // userBookId, rate, doneDate, updateDate
        try {
            if (userBookId && rate && doneDate && updatedDate) {
                await updateDoneBook(userBookId, rate, doneDate, updatedDate);
                alert('책을 수정했습니다.');
                router.push('/readBookList');
            } else {
                throw new Error('오류 발생: 책 아이디 값이 없습니다.');
            }
        } catch (error) {
            console.error('오류 발생:', error);
        }
    };

    return (
        <div className={styles.layout}>
            <h3 className={styles.title}>읽은 책에 담기</h3>
            <div className={styles.container}>
                <p className={styles.bookTitle}>책 제목: {bookTitle}</p>
                <div className={styles.dateBox}>
                    <span className={styles.text}>다 읽은 날짜:</span>
                    <input
                        className={styles.date}
                        type='date'
                        value={date}
                        onChange={(e) => setDoneDate(e.target.value)}
                    />
                </div>
                <div className={styles.rate}>
                    <HeartRating getRateValue={getRateValue} />
                </div>
            </div>
            <Button text='수정하기' onClick={onClick} />
        </div>
    );
}

function getToday() {
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (1 + date.getMonth())).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
}
