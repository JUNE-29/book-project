import { useRouter } from 'next/router';
import styles from './book_counting.module.css';

export default function BookCounting({ books }) {
    const router = useRouter();

    const counting = () => {
        if (router.pathname === '/readBookList') {
            return <span>총 읽은 책 : {books.length}권</span>;
        } else if (router.pathname === '/wishBookList') {
            return <span>총 읽고 싶은 책 : {books.length}권</span>;
        }
    };

    return <div className={styles.counting}>{counting()}</div>;
}
