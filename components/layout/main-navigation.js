import Link from 'next/link';
import style from './main-navigation.module.css';

export default function MainNavigation() {
    return (
        <header className={style.header}>
            <nav className={style.nav}>
                <ul className={style.ul}>
                    <li>
                        <Link href='/readBookList'>서적</Link>
                    </li>
                    <li>감상문</li>
                    <li>필사함</li>
                    <li>검색</li>
                </ul>
            </nav>
        </header>
    );
}
