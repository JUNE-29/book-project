import { useRef, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';

import styles from './write_review.module.css';
import Button from '../ui/button';
import { useRouter } from 'next/router';
import { calculateKoreanTime } from '../calculate/get-today';

export default function WriteReview({ book }) {
    const { bookTitle, userBookId } = book;
    const router = useRouter();
    const [emojiPicker, setEmojiPicker] = useState(false);
    const [emojiUniCode, setEmojiUniCode] = useState();

    const openEmojiPicker = () => {
        setEmojiPicker(true);
    };

    const onEmojiClick = (emoji) => {
        setEmojiPicker(false);
        const unifiedEmoji = emoji.unified;
        if (unifiedEmoji.includes('-')) {
            const unicode = unifiedEmoji.split('-');
            setEmojiUniCode(unicode[0]);
        } else {
            setEmojiUniCode(unifiedEmoji);
        }
    };

    const titleRef = useRef();
    const textAreaRef = useRef();
    const onSubmit = async (event) => {
        event.preventDefault();
        const reviewTitle = titleRef.current.value;
        const reviewContent = textAreaRef.current.value;
        const createdDate = calculateKoreanTime();

        if (userBookId) {
            try {
                await fetch('/api/addReview', {
                    method: 'POST',
                    body: JSON.stringify({
                        reviewTitle: reviewTitle,
                        reviewContent: reviewContent,
                        emojiUniCode: emojiUniCode,
                        userBookId: userBookId,
                        bookTitle: bookTitle,
                        createdDate: createdDate,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then((response) => {
                    if (response.status === 201) {
                        alert('감상문을 등록했습니다!');
                        router.push('/book-review');
                    } else {
                        alert('등록에 실패했습니다.');
                    }
                });
            } catch (error) {
                console.error('오류 발생:', error);
            }
        }
    };
    return (
        <>
            <div className={styles.component}>
                <h3 className={styles.h3}>'{bookTitle}' 감상문 쓰기</h3>
                <form className={styles.form}>
                    <div className={styles.emojiContainer}>
                        <div
                            className={styles.emojiBox}
                            onClick={openEmojiPicker}
                        >
                            <div className={styles.emojiPickerBox}>
                                {emojiPicker && (
                                    <div className={styles.emojiPicker}>
                                        <EmojiPicker
                                            onEmojiClick={onEmojiClick}
                                            skinTonesDisabled={true}
                                            defaultSkinTone='neutral'
                                        />
                                    </div>
                                )}
                            </div>
                            <span className={styles.emoji}>
                                {emojiUniCode ? (
                                    String.fromCodePoint(`0x${emojiUniCode}`)
                                ) : (
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        height='22'
                                        viewBox='0 -960 960 960'
                                        width='22'
                                    >
                                        <path d='M480-480Zm0 400q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q43 0 83 8.5t77 24.5v90q-35-20-75.5-31.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-32-6.5-62T776-600h86q9 29 13.5 58.5T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm320-600v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80ZM620-520q25 0 42.5-17.5T680-580q0-25-17.5-42.5T620-640q-25 0-42.5 17.5T560-580q0 25 17.5 42.5T620-520Zm-280 0q25 0 42.5-17.5T400-580q0-25-17.5-42.5T340-640q-25 0-42.5 17.5T280-580q0 25 17.5 42.5T340-520Zm140 260q68 0 123.5-38.5T684-400H276q25 63 80.5 101.5T480-260Z' />
                                    </svg>
                                )}
                            </span>
                        </div>
                        <span className={styles.text}>
                            책을 읽고 난 후 어땠는지 이모티콘으로 표현해주세요!
                        </span>
                    </div>
                    <div className={styles.contents}>
                        <input
                            ref={titleRef}
                            className={styles.input}
                            placeholder='감상문 제목'
                        ></input>
                        <textarea
                            ref={textAreaRef}
                            className={styles.textarea}
                        ></textarea>
                    </div>
                    <div className={styles.button}>
                        <Button text='등록' onClick={onSubmit} />
                    </div>
                </form>
            </div>
        </>
    );
}
