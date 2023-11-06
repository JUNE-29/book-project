import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

import KaKaoAPI from '@/lib/kakaoAPI-utils';
import BookDetail from '@/components/book/book-detail';

import styles from '../../../styles/book-detail-page.module.css';
import { selectBookByBookId } from '@/lib/db-util';

export default function readBookDetail(props) {
    const { book } = props;
    const router = useRouter();

    const isbn = book.isbn;

    const kakaoApi = new KaKaoAPI();

    const { data, isLoading, error } = useQuery(
        ['book', isbn],
        () => kakaoApi.searchByIsbn(isbn),
        {
            staleTime: 1000 * 60 * 360,
        }
    );

    const goToList = () => {
        router.push('/readBookList');
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
            {data && (
                <BookDetail book={data.documents[0]} score={book.starScore} />
            )}
        </div>
    );
}

export async function getServerSideProps(context) {
    const { params } = context;
    const userBookId = params.userBookId;
    const book = await selectBookByBookId(userBookId);

    const starScore = book[0].user_book_star_score;

    let bookIsbn;
    if (book[0].book_isbn) {
        const isbn = book[0].book_isbn;
        const splittedIsbn = isbn.split(' ');
        splittedIsbn[0]
            ? (bookIsbn = splittedIsbn[0])
            : (bookIsbn = splittedIsbn[1]);
    }
    return {
        props: {
            book: {
                starScore: starScore,
                isbn: bookIsbn,
            },
        },
    };
}
