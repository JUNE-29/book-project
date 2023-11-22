import Link from 'next/link';
import style from './main-navigation.module.css';

export default function MainNavigation() {
    return (
        <nav className={style.nav}>
            <ul className={style.ul}>
                <li>
                    <Link href='/readBookList'>서적</Link>
                </li>
                <li>
                    <Link href='/book-review'>감상문</Link>
                </li>
                <li>
                    <Link href='/book-transcription'>필사함</Link>
                </li>
                <li>
                    <Link href='/search'>검색</Link>
                </li>
            </ul>
        </nav>
    );
}
