import UpdateDoneBook from '@/components/book/done_book_updating';
import { selectBookByBookId } from '@/lib/db-util';

export default function UpdateReadBook(props) {
    const { book } = props;
    return <UpdateDoneBook book={book} />;
}

export async function getServerSideProps(context) {
    const { params } = context;
    const userBookId = params.userBookId;
    const book = await selectBookByBookId(userBookId);

    return {
        props: {
            book: book,
        },
    };
}
