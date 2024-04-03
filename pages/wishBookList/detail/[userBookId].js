import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

import KaKaoAPI from '@/lib/kakaoAPI-utils';
import BookDetail from '@/components/book/book-detail';
import { selectBookByBookId } from '@/lib/db-util';
import RemoveBookfromBookList from '@/components/book/book_removal';

import styles from '../../../styles/book-detail-page.module.css';
import Button from '@/components/ui/button';
import BackButton from '@/components/ui/back-button';
import { getSession } from 'next-auth/react';
import getUserEmail from '@/components/calculate/get-user-email';

export default function wishBookDetail(props) {
    const router = useRouter();
    const { book, userEmail } = props;

    if (book === null) {
        return (
            <div className={styles.errorMsg}>
                <p>없는 정보 입니다.</p>
                <p
                    onClick={() => router.push('/wishBookList')}
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
        router.push('/wishBookList');
    };

    const addDoneBook = () => {
        if (data) {
            router.push(
                `/readBook/add/${data.documents[0].title}/${data.documents[0].isbn}`
            );
        }
    };

    const removeBook = async () => {
        if (confirm('책을 목록에서 삭제하시겠습니까?')) {
            const userBookId = book.userBookId;
            const result = await RemoveBookfromBookList(userBookId, userEmail);

            if (result === 'success') {
                alert('책을 삭제했습니다.');
                goToList();
            }
        } else {
            return;
        }
    };

    return (
        book && (
            <div className={styles.layout}>
                <BackButton text='목록으로 가기' onClick={goToList} />
                <h3 className={styles.title}>책 정보 자세히 보기</h3>
                {isLoading && <p>불러오는 중...</p>}
                {error && <p>오류가 있습니다. 다시 시도해주십시오.</p>}
                {data && <BookDetail book={data.documents[0]} />}
                <div className={styles.twoBtnlayout}>
                    <Button text='읽은 책에 담기' onClick={addDoneBook} />
                    <Button text='삭제하기' onClick={removeBook} />
                </div>
            </div>
        )
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    const { params } = context;

    if (!session) {
        return {
            redirect: {
                destination: '/',
            },
        };
    }

    const userEmail = getUserEmail(session.user.email);
    const userBookId = params.userBookId;
    const book = await selectBookByBookId(userBookId, userEmail);

    if (book[0] === undefined) {
        return {
            props: {
                book: null,
            },
        };
    }

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
            userEmail: userEmail,
            book: {
                userBookId: userBookId,
                isbn: bookIsbn,
            },
        },
    };
}
