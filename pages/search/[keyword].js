import SearchBar from '@/components/search/search-bar';
import SearchBookList from '@/components/search/search-bookList';
import Button from '@/components/ui/button';
import KaKaoAPI from '@/lib/kakaoAPI-utils';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

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
    //hasNextPage ? fetchNextPage() : alert('다음 리스트가 없습니다!😅');

    return (
        <div>
            <SearchBar />
            {isLoading && <p>Loading...</p>}
            {error && <p>Something is wrong😫</p>}
            <div className={styles.listBox}>
                {data &&
                    data.pages.map((books) => <SearchBookList books={books} />)}
                {hasNextPage && (
                    <Button text={'리스트 더 보기'} onClick={getNextPage} />
                )}
            </div>
        </div>
    );
}
