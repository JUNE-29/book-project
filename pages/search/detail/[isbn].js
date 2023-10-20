import BookDetail from '@/components/book/book-detail';
import KaKaoAPI from '@/lib/kakaoAPI-utils';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import styles from '../../../styles/search-detail.module.css';

export default function SearchBookDetail() {
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

    return (
        <div className={styles.layout}>
            {isLoading && <p>불러오는 중...</p>}
            {error && <p>오류가 있습니다. 다시 시도해주십시오.</p>}
            {book && <BookDetail book={book.documents[0]} />}
        </div>
    );
}
