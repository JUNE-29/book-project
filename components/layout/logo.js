import Image from 'next/image';

import style from './logo.module.css';

export default function Logo() {
    return (
        <div className={style.logo}>
            <Image
                src='/images/logo.svg'
                alt='logo-image'
                width={83}
                height={26}
            />
        </div>
    );
}
