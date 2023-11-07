import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

import KaKaoAPI from '@/lib/kakaoAPI-utils';
import BookDetail from '@/components/book/book-detail';
import { selectBookByBookId } from '@/lib/db-util';
import RemoveBookfromBookList from '@/components/book/book_removal';

import styles from '../../../styles/book-detail-page.module.css';
import BackButton from '@/components/ui/back-button';
import Button from '@/components/ui/button';

export default function readBookDetail(props) {
    const { book } = props;
    const router = useRouter();

    if (book === null) {
        return (
            <div className={styles.errorMsg}>
                <p>없는 정보 입니다.</p>
                <p
                    onClick={() => router.push('/readBookList')}
                    className={styles.errorMsgBtn}
                >
                    목록으로 돌아가기
                </p>
            </div>
        );
    }

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

    const removeBook = async () => {
        if (confirm('책을 목록에서 삭제하시겠습니까?')) {
            const result = await RemoveBookfromBookList(book.userBookId);

            if (result === 'success') {
                alert('책을 삭제했습니다.');
                goToList();
            }
        } else {
            return;
        }
    };

    return (
        <div className={styles.layout}>
            <BackButton text='목록으로 가기' onClick={goToList} />
            <h3 className={styles.title}>책 정보 자세히 보기</h3>
            {isLoading && <p>불러오는 중...</p>}
            {error && <p>오류가 있습니다. 다시 시도해주십시오.</p>}
            {data && (
                <BookDetail book={data.documents[0]} score={book.starScore} />
            )}
            <div className={styles.btnlayout}>
                <Button text='삭제하기' onClick={removeBook} />
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const { params } = context;
    const userBookId = params.userBookId;
    const book = await selectBookByBookId(userBookId);

    if (book[0] === undefined) {
        return {
            props: {
                book: null,
            },
        };
    }

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
                userBookId: userBookId,
                starScore: starScore,
                isbn: bookIsbn,
            },
        },
    };
}
