import { useRef } from 'react';

import style from './user-profile.module.css';

export default function UserProfile() {
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
            <div className={style.userName} onClick={onClick}>
                <span>사용자</span>
                <span className={style.downIcon}>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        height='24'
                        viewBox='0 -960 960 960'
                        width='24'
                        fill='none'
                    >
                        <path d='M480-360 280-560h400L480-360Z' />
                    </svg>
                </span>
            </div>
            <div className={style.downMenu} ref={downBox}>
                <div className={style.downBox}>
                    <span className={style.menu}>회원 정보 변경</span>
                    <span className={style.menu}>로그아웃</span>
                </div>
            </div>
        </div>
    );
}
