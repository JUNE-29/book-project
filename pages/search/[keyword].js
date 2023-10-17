import SearchBar from '@/components/search/search-bar';
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

    console.log(books);

    return (
        <>
            <SearchBar />
            {isLoading && <p>Loading...</p>}
            {error && <p>Something is wrong😫</p>}
            {books && (
                <ul>
                    {books.documents.map((book) => (
                        <li key={book.isbn}>{book.title}</li>
                    ))}
                </ul>
            )}
        </>
    );
}
