import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import KaKaoAPI from '@/lib/kakaoAPI-utils';

import { selectBookByBookId, selectReviewByReviewId } from '@/lib/db-util';
import BookDetail from '@/components/book/book-detail';
import ReviewContetns from '@/components/review/review_contents';

import BackButton from '@/components/ui/back-button';
import Button from '@/components/ui/button';

import styles from '../../../styles/book-detail-page.module.css';

export default function ReviewDetail(props) {
    const { review, book } = props;
    const router = useRouter();
    const isbn = book.isbn;
    const kakaoApi = new KaKaoAPI();

    const {
        data: kakaoData,
        isLoading,
        error,
    } = useQuery(['book', isbn], () => kakaoApi.searchByIsbn(isbn), {
        staleTime: 1000 * 60 * 360,
    });

    const goToList = () => {
        router.push('/book-review');
    };

    return (
        <div className={styles.layout}>
            <BackButton text='목록으로 가기' onClick={goToList} />
            {isLoading && <p>불러오는 중...</p>}
            {error && <p>오류가 있습니다. 다시 시도해주십시오.</p>}
            {kakaoData && (
                <BookDetail
                    book={kakaoData.documents[0]}
                    score={book.starScore}
                    readDate={book.readDate}
                />
            )}
            <ReviewContetns review={review} />
            <div className={styles.btnlayout}>
                <Button text='수정하기' />
                <Button text='삭제하기' />
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const { params } = context;
    const reviewId = params.reviewId;
    const review = await selectReviewByReviewId(reviewId);
    const book = await selectBookByBookId(review[0].user_book_id);

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
            review: {
                reviewId: reviewId,
                reviewTitle: review[0].review_title,
                reviewContent: review[0].review_content,
                createDate: review[0].create_date,
            },
            book: {
                starScore: book[0].user_book_star_score,
                readDate: book[0].user_book_done_date,
                isbn: bookIsbn,
            },
        },
    };
}
