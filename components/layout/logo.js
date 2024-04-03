import Image from 'next/image';

import style from './logo.module.css';
import Link from 'next/link';

export default function Logo() {
    return (
        <div className={style.logo}>
            <Link href='/'>
                <Image
                    src='/images/logo.svg'
                    alt='logo-image'
                    width={83}
                    height={26}
                />
            </Link>
        </div>
    );
}
