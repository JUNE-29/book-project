import styles from './back-button.module.css';

export default function BackButton({ text, onClick }) {
    return (
        <div className={styles.backBtn} onClick={onClick}>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                height='22'
                viewBox='0 -960 960 960'
                width='22'
            >
                <path d='m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z' />
            </svg>
            <span className={styles.backBtnText}>{text}</span>
        </div>
    );
}
