import { useRef } from 'react';
import styles from './done_book_item.module.css';

export default function DoneBooksItem({ book, selectBook }) {
    const liCheck = useRef();
    const onClick = () => {
        let checkedBook = liCheck.current.children[0];
        if (checkedBook.checked) {
            OnlyCheckBox(checkedBook);
        }
    };
    return (
        <li className={styles.li} ref={liCheck} onClick={onClick}>
            <input
                name='doneBook'
                className={styles.input}
                type='checkbox'
                id={book.userBookId}
            ></input>
            <label
                className={styles.label}
                htmlFor={book.userBookId}
                onClick={() => selectBook(book)}
            >
                <img
                    className={styles.thumbnail}
                    src={book.thumbnail}
                    alt='thumbnail'
                />
                <span className={styles.title}>
                    {book.bookTitle.length > 11
                        ? `${book.bookTitle.slice(0, 11)}..`
                        : book.bookTitle}
                </span>
                <svg
                    className={styles.check}
                    xmlns='http://www.w3.org/2000/svg'
                    height='50'
                    viewBox='0 -960 960 960'
                    width='50'
                >
                    <path d='m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z' />
                </svg>
            </label>
        </li>
    );
}

function OnlyCheckBox(checkedBook) {
    const checkBoxs = document.getElementsByName('doneBook');
    checkBoxs.forEach((book) => {
        book.checked = false;
    });
    checkedBook.checked = true;
}
