import styles from './no-image.module.css';

export default function NoImage() {
    return (
        <div className={styles.noImage}>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                height='24'
                viewBox='0 -960 960 960'
                width='24'
            >
                <path d='m819-28-92-92H200q-33 0-56.5-23.5T120-200v-527l-92-93 56-56L876-84l-57 56ZM200-200h447l-80-80H240l120-160 80 109 34-42-274-274v447Zm640-33-80-80v-447H313l-80-80h527q33 0 56.5 23.5T840-760v527ZM539-534ZM424-423Z' />
            </svg>
            <p className={styles.message}>이미지가 없습니다</p>
        </div>
    );
}
