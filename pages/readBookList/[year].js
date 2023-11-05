import { useRouter } from 'next/router';

import BookList from '@/components/book/bookList';
import BookCounting from '@/components/book/book_counting';
import BookNavigation from '@/components/book/book_navigation';
import {
    getFilteredDoneBookCreatedYear,
    getFilteredDoneBookList,
} from '@/lib/db-util';

export default function FilteredReadBookList(props) {
    const { bookList, filteredYear } = props;

    const router = useRouter();

    const goToDetail = (userBookId) => {
        router.push(`/readBookList/detail/${userBookId}`);
    };

    const selectBook = (book) => {
        if (book) {
            const userBookId = book.user_book_id;
            goToDetail(userBookId);
        }
    };

    return (
        <>
            <BookNavigation />
            <BookCounting books={bookList} filteredYear={filteredYear} />
            <BookList books={bookList} selectBook={selectBook} />
        </>
    );
}

export async function getStaticProps(context) {
    const year = context.params.year;
    const filteredDoneBookList = await getFilteredDoneBookList(year);
    const filteredYear = await getFilteredDoneBookCreatedYear();
    return {
        props: { bookList: filteredDoneBookList, filteredYear: filteredYear },
    };
}

export async function getStaticPaths() {
    const doneBookCreateYear = await getFilteredDoneBookCreatedYear();
    const paths = doneBookCreateYear.map((yaer) => ({
        params: { year: yaer },
    }));

    return {
        paths: paths,
        fallback: true,
    };
}
