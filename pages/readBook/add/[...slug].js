import AddDoneBook from '@/components/book/done_book_adding';

export default function AddReadBook(props) {
    const { book } = props;

    return <AddDoneBook book={book} />;
}

export async function getServerSideProps(context) {
    const { params } = context;
    const book = params.slug;
    const bookTitle = book[0];
    const bookIsbn = book[1];

    return {
        props: {
            book: {
                bookTitle: bookTitle,
                bookIsbn: bookIsbn,
            },
        },
    };
}
