import MainNavigation from './main-navigation';

import style from './header.module.css';
import Logo from './logo';
import UserProfile from './user-profile';

export default function Header() {
    return (
        <header className={style.header}>
            <Logo />
            <MainNavigation />
            <UserProfile />
        </header>
    );
}
