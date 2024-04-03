import BookList from '@/components/book/bookList';
import BookCounting from '@/components/book/book_counting';
import BookNavigation from '@/components/book/book_navigation';
import getUserEmail from '@/components/calculate/get-user-email';
import { getFilteredDoneBookCreatedYear } from '@/lib/book-utils';
import { checkUser, getDoneBooks } from '@/lib/db-util';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function readBooksList(props) {
    const { books, filteredYear } = props;

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
            <BookCounting books={books} filteredYear={filteredYear} />
            <BookList books={books} selectBook={selectBook} />
        </>
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

    const userEmail = getUserEmail(session.user.email);

    const books = await getDoneBooks(userEmail);
    const filteredYear = await getFilteredDoneBookCreatedYear(userEmail);
    return {
        props: { books: books, filteredYear: filteredYear },
    };
}
