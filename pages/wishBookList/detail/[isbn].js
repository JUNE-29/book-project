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

    return (
        <div className={styles.layout}>
            <h3 className={styles.title}>책 정보 자세히 보기</h3>
            {isLoading && <p>불러오는 중...</p>}
            {error && <p>오류가 있습니다. 다시 시도해주십시오.</p>}
            {book && <BookDetail book={book.documents[0]} />}
            <div className={styles.btnlayout}>
                <Button text='목록으로 가기' onClick={goToList} />
            </div>
        </div>
    );
}
