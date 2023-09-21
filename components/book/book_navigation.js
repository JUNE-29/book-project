import Link from 'next/link';
import styles from './book_navigation.module.css';

export default function BookNavigation() {
    return (
        <nav className={styles.nav}>
            <Link href='/readBookList'>
                <span className={styles.menu}>읽은 책</span>
            </Link>
            <Link href='/wishBookList'>
                <span className={styles.menu}>읽고 싶은 책</span>
            </Link>
        </nav>
    );
}
