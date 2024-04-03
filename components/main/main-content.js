import Image from 'next/image';
import styles from './mainContent.module.css';

export default function MainContent({ logIn }) {
    return (
        <div className={styles.div}>
            <div className={styles.copyLoginBox}>
                <p className={styles.copy}>
                    독서의 즐거움을 놓치지 마세요. 간단하게 기록하는 나만의 독서
                    공간
                </p>
                <button className={styles.btn} onClick={logIn}>
                    <span>기록하러가기</span>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        height='21'
                        viewBox='0 -960 960 960'
                        width='21'
                    >
                        <path d='M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z' />
                    </svg>
                </button>
            </div>
            <Image
                src='/images/main.jpg'
                alt='main-image'
                width={1208}
                height={805}
                className={styles.image}
            />
        </div>
    );
}
