import { useRouter } from 'next/router';

import BookList from '@/components/book/bookList';
import BookCounting from '@/components/book/book_counting';
import BookNavigation from '@/components/book/book_navigation';
import {
    getFilteredDoneBookCreatedYear,
    getFilteredDoneBookList,
} from '@/lib/db-util';
import { getSession } from 'next-auth/react';

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

export async function getServerSideProps(context) {
    const year = context.params.year;
    const session = await getSession(context);

    const userEmail = getUserEmail(session.user.email);

    const filteredDoneBookList = await getFilteredDoneBookList(year, userEmail);
    const filteredYear = await getFilteredDoneBookCreatedYear(userEmail);
    return {
        props: { bookList: filteredDoneBookList, filteredYear: filteredYear },
    };
}

// export async function getStaticProps(context) {
//     const year = context.params.year;
//     const session = await getSession(context);

//     const email = session.user.email;
//     const splitedUserEmail = email.split('.');
//     const userEmail = splitedUserEmail[0];

//     console.log(userEmail);

//     const filteredDoneBookList = await getFilteredDoneBookList(year, userEmail);
//     const filteredYear = await getFilteredDoneBookCreatedYear(userEmail);
//     return {
//         props: { bookList: filteredDoneBookList, filteredYear: filteredYear },
//     };
// }

// export async function getStaticPaths(context) {
//     const session = await getSession(context);

//     const email = session.user.email;
//     const splitedUserEmail = email.split('.');
//     const userEmail = splitedUserEmail[0];

//     const doneBookCreateYear = await getFilteredDoneBookCreatedYear(userEmail);
//     const paths = doneBookCreateYear.map((yaer) => ({
//         params: { year: yaer },
//     }));

//     return {
//         paths: paths,
//         fallback: true,
//     };
// }
