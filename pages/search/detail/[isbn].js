import BookDetail from '@/components/book/book-detail';
import KaKaoAPI from '@/lib/kakaoAPI-utils';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import styles from '../../../styles/search-detail.module.css';
import Button from '@/components/ui/button';
import AddWishBook from '@/components/book/wish_book_adding';

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

    const addDoneBook = () => {
        if (book) {
            router.push(
                `/readBook/add/${book.documents[0].title}/${book.documents[0].isbn}`
            );
        }
    };

    const addWishBook = () => {
        if (book) {
            AddWishBook(book.documents[0].title, book.documents[0].isbn);
        }
    };

    return (
        <div className={styles.layout}>
            <h3 className={styles.title}>책 정보 자세히 보기</h3>
            {isLoading && <p>불러오는 중...</p>}
            {error && <p>오류가 있습니다. 다시 시도해주십시오.</p>}
            {book && <BookDetail book={book.documents[0]} />}
            <div className={styles.btnlayout}>
                <Button text='읽은 책에 담기' onClick={addDoneBook} />
                <Button text='읽고 싶은 책에 담기' onClick={addWishBook} />
            </div>
        </div>
    );
}
