import styles from './bookItem.module.css';

export default function BookItem({ book, bookNumber, selectBook }) {
    const colors = ['', `${styles.second}`, `${styles.third}`];
    const bookType = (bookNumber) => {
        const colorsNum = bookNumber % colors.length;
        return colors[colorsNum];
    };

    return (
        <li
            className={`${styles.li} ${bookType(bookNumber)}`}
            onClick={() => selectBook(book)}
        >
            {book.book_title}
        </li>
    );
}
