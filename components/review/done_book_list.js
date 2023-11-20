import Button from '../ui/button';
import DoneBooksItem from './done_book_item';
import styles from './done_book_list.module.css';

export default function DoneBookList({ selectBook, books, pickABook }) {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h2 className={styles.h2}>읽은 책 서재</h2>
                <span className={styles.info}>책을 선택해주세요</span>
            </div>
            <div className={styles.contents}>
                <ul className={styles.books}>
                    {books.map((book) => (
                        <DoneBooksItem
                            book={book}
                            key={book.userBookId}
                            selectBook={selectBook}
                        />
                    ))}
                </ul>
            </div>
            <div className={styles.buttonBox}>
                <Button text='등록' onClick={pickABook} />
            </div>
        </div>
    );
}
