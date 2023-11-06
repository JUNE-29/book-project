import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

import KaKaoAPI from '@/lib/kakaoAPI-utils';
import BookDetail from '@/components/book/book-detail';

import styles from '../../../styles/book-detail-page.module.css';
import Button from '@/components/ui/button';

export default function wishBookDetail() {
    const router = useRouter();
    const isbn = router.query.isbn;

    const kakaoApi = new KaKaoAPI();

    const {
        data: book,
        isLoading,
        error,
    } = useQuery(['book', isbn], () => kakaoApi.searchByIsbn(isbn), {
        staleTime: 1000 * 60 * 360,
    });

    const goToList = () => {
        router.push('/wishBookList');
    };

    const addDoneBook = () => {
        if (book) {
            router.push(
                `/readBook/add/${book.documents[0].title}/${book.documents[0].isbn}`
            );
        }
    };

    return (
        <div className={styles.layout}>
            <div className={styles.backBtn} onClick={goToList}>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='22'
                    viewBox='0 -960 960 960'
                    width='22'
                >
                    <path d='m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z' />
                </svg>
                <span className={styles.backBtnText}>목록으로 가기</span>
            </div>
            <h3 className={styles.title}>책 정보 자세히 보기</h3>
            {isLoading && <p>불러오는 중...</p>}
            {error && <p>오류가 있습니다. 다시 시도해주십시오.</p>}
            {book && <BookDetail book={book.documents[0]} />}
            <div className={styles.btnlayout}>
                <Button text='읽은 책에 담기' onClick={addDoneBook} />
            </div>
        </div>
    );
}
