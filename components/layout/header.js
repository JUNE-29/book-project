import { useSession } from 'next-auth/react';

import MainNavigation from './main-navigation';
import Logo from './logo';
import UserProfile from './user-profile';

import style from './header.module.css';

export default function Header() {
    const { data: session } = useSession();
    return (
        <header className={style.header}>
            <Logo />
            {session && <MainNavigation />}
            <UserProfile />
        </header>
    );
}
