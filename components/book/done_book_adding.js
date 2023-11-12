import { useRef } from 'react';
import { useRouter } from 'next/router';

import getToday from '../calculate/get-today';
import { HeartRating } from '@/components/ui/rating';
import Button from '@/components/ui/button';

import styles from './done_book_adding.module.css';

export default function AddDoneBook(props) {
    const { book } = props;

    const router = useRouter();

    const bookTitle = book.bookTitle;
    const bookIsbn = book.bookIsbn;
    const dateRef = useRef();

    let rate = null;
    const getRateValue = (rateValue) => {
        rate = rateValue;
    };

    const onClick = async () => {
        const doneDate = dateRef.current.value;
        if (doneDate === '') {
            alert('다 읽은 날짜를 입력해주세요!');
            return;
        } else if (rate === 0) {
            alert('책에 대한 점수를 입력해주세요!');
            return;
        }
        if ((bookTitle, bookIsbn)) {
            const createdDate = getToday();
            try {
                await fetch('/api/addBook', {
                    method: 'POST',
                    body: JSON.stringify({
                        bookIsbn: bookIsbn,
                        bookTitle: bookTitle,
                        createdDate: createdDate,
                        doneDate: doneDate,
                        score: rate,
                        status: 'done',
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then((response) => {
                        if (response.ok) {
                            alert('책을 등록하였습니다!');
                            return response.json();
                        }
                        return response.json().then((data) => {
                            throw new Error(
                                data.message || '오류가 발생했습니다.'
                            );
                        });
                    })
                    .then(() => {
                        router.push('/readBookList');
                    });
            } catch (error) {
                console.error('오류 발생:', error);
            }
        }
    };

    return (
        <div className={styles.layout}>
            <h3 className={styles.title}>읽은 책에 담기</h3>
            <div className={styles.container}>
                <p className={styles.bookTitle}>책 제목: {book.bookTitle}</p>
                <div className={styles.dateBox}>
                    <span className={styles.text}>다 읽은 날짜:</span>
                    <input className={styles.date} ref={dateRef} type='date' />
                </div>
                <div className={styles.rate}>
                    <HeartRating getRateValue={getRateValue} />
                </div>
            </div>
            <Button text='서재에 담기' onClick={onClick} />
        </div>
    );
}
