import SearchBar from '@/components/search/search-bar';
import SearchBookList from '@/components/search/search-bookList';
import Button from '@/components/ui/button';
import KaKaoAPI from '@/lib/kakaoAPI-utils';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';

import styles from '../../styles/search-keyword.module.css';

export default function SearchKeyword() {
    const router = useRouter();
    const keyword = router.query.keyword;
    const kakaoApi = new KaKaoAPI();

    const { isLoading, error, data, fetchNextPage, refetch, hasNextPage } =
        useInfiniteQuery({
            queryKey: ['books', keyword],
            queryFn: async ({ pageParam = 0 }) => {
                const nextPage = pageParam + 1;
                return kakaoApi.search(nextPage, keyword);
            },
            getNextPageParam: (lastPage, allPages) =>
                lastPage.meta.is_end ? undefined : allPages.length + 1,
        });

    const getNextPage = () => fetchNextPage();

    const goToDetail = (isbn) => {
        router.push(`/search/detail/${isbn}`);
    };
    const selectBook = (book) => {
        if (book) {
            const isbn = book.isbn;
            const splittedIsbn = isbn.split(' ');
            splittedIsbn[0]
                ? goToDetail(splittedIsbn[0])
                : goToDetail(splittedIsbn[1]);
        }
    };

    return (
        <div>
            <SearchBar />
            {isLoading && <p>불러오는 중...</p>}
            {error && <p>오류가 있습니다. 다시 시도해주십시오.</p>}
            <div className={styles.listBox}>
                {data &&
                    data.pages.map((books, index) => (
                        <SearchBookList
                            books={books}
                            selectBook={selectBook}
                            key={index}
                        />
                    ))}
                {hasNextPage && (
                    <Button text={'리스트 더 보기'} onClick={getNextPage} />
                )}
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: '/',
            },
        };
    }

    return {
        props: {
            session: session,
        },
    };
}
