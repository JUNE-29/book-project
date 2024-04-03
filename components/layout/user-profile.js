import { signIn, signOut, useSession } from 'next-auth/react';
import { useRef } from 'react';

import style from './user-profile.module.css';

export default function UserProfile() {
    const { data: session, status } = useSession();

    const downBox = useRef();
    let userNameBtnToggle = true;
    const onClick = () => {
        if (userNameBtnToggle) {
            downBox.current.style.display = 'flex';
            userNameBtnToggle = !userNameBtnToggle;
        } else {
            downBox.current.style.display = 'none';
            userNameBtnToggle = true;
        }
    };

    return (
        <div className={style.profile}>
            <div className={style.userName}>
                {status === 'loading' && <span>loading..</span>}
                {status === 'unauthenticated' && (
                    <span onClick={() => signIn()}>로그인</span>
                )}
            </div>
            {status === 'authenticated' && (
                <div className={style.downMenu} onClick={onClick}>
                    <img
                        className={style.userPhoto}
                        src={session.user.image}
                        alt='user profile photo'
                    />
                    <span>{session.user.name}</span>
                    <div className={style.downBox} ref={downBox}>
                        <span className={style.menu} onClick={() => signOut()}>
                            로그아웃
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
