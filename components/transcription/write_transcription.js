import { useRef, useState } from 'react';

import { HexColorPicker } from 'react-colorful';

import styles from './write_transcription.module.css';
import Button from '../ui/button';
import { calculateKoreanTime } from '../calculate/get-today';
import { useRouter } from 'next/router';

export default function WriteTranscription({ book, transcription }) {
    const { bookTitle, userBookId } = book;
    const router = useRouter();
    const [color, setColor] = useState();
    const [colorPicker, setColorPicker] = useState(false);
    const openColorPicker = () => {
        setColorPicker(true);
    };

    const closeColorPicker = () => {
        setColorPicker(false);
    };

    const pageRef = useRef();
    const textAreaRef = useRef();

    const onSubmit = async (event) => {
        event.preventDefault();
        const bookPage = pageRef.current.value;
        const transcriptionContents = textAreaRef.current.value;
        const createdDate = calculateKoreanTime();

        if (!color) {
            return alert('필사함 색상을 선택해주세요!');
        } else if (bookPage === '' || transcriptionContents === '') {
            return alert('페이지 또는 필사 내용을 입력해주세요!');
        }

        if (userBookId && transcription === undefined) {
            try {
                await fetch('/api/transcription/addNewTranscription', {
                    method: 'POST',
                    body: JSON.stringify({
                        colorHexCode: color,
                        bookPage: bookPage,
                        transcriptionContents: transcriptionContents,
                        userBookId: userBookId,
                        bookTitle: bookTitle,
                        createdDate: createdDate,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then((response) => {
                    if (response.status === 201) {
                        alert('필사를 등록했습니다!');
                        router.push('/book-transcription');
                    } else {
                        alert('등록에 실패했습니다.');
                    }
                });
            } catch (error) {
                console.error('오류 발생:', error);
            }
            return;
        }

        if (userBookId && transcription.transcId) {
            try {
                await fetch('/api/transcription/editTranscription', {
                    method: 'POST',
                    body: JSON.stringify({
                        transcId: transcription.transcId,
                        transcriptionContents: transcriptionContents,
                        colorHexCode: color,
                        bookPage: bookPage,
                        editDate: createdDate,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then((response) => {
                    if (response.status === 201) {
                        alert('감상문을 수정했습니다!');
                        //router.push('/book-transcription');
                    } else {
                        alert('수정에 실패했습니다.');
                    }
                });
            } catch (error) {
                console.error('오류 발생:', error);
            }
        }
    };

    return (
        <div className={styles.component}>
            <h3 className={styles.h3}>
                '{bookTitle}' 에서 마음에 드는 문장 필사 하기
            </h3>
            <form className={styles.form}>
                <div className={styles.colorContainer}>
                    <div
                        className={styles.colorBox}
                        style={{ backgroundColor: color }}
                        onClick={openColorPicker}
                    >
                        <div className={styles.colorPickerBox}>
                            {colorPicker && (
                                <div className={styles.colorPicker}>
                                    <HexColorPicker
                                        color={color}
                                        onChange={setColor}
                                    />
                                </div>
                            )}
                        </div>
                        <span className={styles.color}>
                            {!color && (
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    height='24'
                                    viewBox='0 -960 960 960'
                                    width='24'
                                >
                                    <path d='M346-140 100-386q-10-10-15-22t-5-25q0-13 5-25t15-22l230-229-106-106 62-65 400 400q10 10 14.5 22t4.5 25q0 13-4.5 25T686-386L440-140q-10 10-22 15t-25 5q-13 0-25-5t-22-15Zm47-506L179-432h428L393-646Zm399 526q-36 0-61-25.5T706-208q0-27 13.5-51t30.5-47l42-54 44 54q16 23 30 47t14 51q0 37-26 62.5T792-120Z' />
                                </svg>
                            )}
                        </span>
                    </div>
                    <span className={styles.text}>
                        필사함 색상을 선택해주세요!
                    </span>
                    <div className={styles.closeColorPicker}>
                        {colorPicker && (
                            <span
                                className={styles.closeColorPickerBtn}
                                onClick={closeColorPicker}
                            >
                                닫기
                            </span>
                        )}
                    </div>
                </div>
                <div className={styles.contents}>
                    <label htmlFor='page'>페이지: </label>
                    <input
                        ref={pageRef}
                        name='page'
                        className={styles.input}
                        defaultValue={
                            transcription ? transcription.bookPage : ''
                        }
                    ></input>
                    <textarea
                        ref={textAreaRef}
                        className={styles.textarea}
                        defaultValue={
                            transcription ? transcription.transcContent : ''
                        }
                    ></textarea>
                </div>
                <div className={styles.button}>
                    <Button text='등록' onClick={onSubmit} />
                </div>
            </form>
        </div>
    );
}
