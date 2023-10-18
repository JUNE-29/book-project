import SearchBar from '@/components/search/search-bar';
import SearchBookList from '@/components/search/search-bookList';
import KaKaoAPI from '@/lib/kakaoAPI-utils';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export default function SearchKeyword() {
    const router = useRouter();
    const keyword = router.query.keyword;
    const kakaoApi = new KaKaoAPI();

    const {
        isLoading,
        error,
        data: books,
    } = useQuery(['books', keyword], () => kakaoApi.search(keyword), {
        staleTime: 1000 * 60 * 360,
    });

    return (
        <>
            <SearchBar />
            {isLoading && <p>Loading...</p>}
            {error && <p>Something is wrong😫</p>}
            {books && <SearchBookList books={books} />}
        </>
    );
}
