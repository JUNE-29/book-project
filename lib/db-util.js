import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set } from 'firebase/database';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export async function getAllBooks() {
    const allBooks = await get(ref(database, 'user/books')).then((snapshot) => {
        if (snapshot.exists()) {
            const allBooks = snapshot.val();
            return Object.values(allBooks);
        } else {
            console.log('No data available');
        }
    });

    return allBooks;
}

export async function getDoneBooks() {
    const allBooks = await getAllBooks();
    return allBooks.filter((book) => book.user_book_status === 'done');
}

export async function getWishBooks() {
    const allBooks = await getAllBooks();
    return allBooks.filter((book) => book.user_book_status === 'wish');
}

export async function getFilteredDoneBookCreatedYear() {
    const doneBooks = await getDoneBooks();
    const createdYear = [];
    doneBooks.map((book) => {
        const splitedDate = book.user_book_create_date.split('-');
        const year = splitedDate[0];
        createdYear.push(year);
    });

    const doneBooksCrYear = Array.from(new Set(createdYear));

    doneBooksCrYear.sort((a, b) => {
        if (a > b) {
            return -1;
        }
        if (a < b) {
            return 1;
        }
        return 0;
    });

    return doneBooksCrYear;
}

export async function getFilteredDoneBookList(year) {
    const doneBooks = await getDoneBooks();
    return doneBooks.filter((book) =>
        book.user_book_create_date.includes(year)
    );
}

export async function selectBookByBookId(userBookId) {
    const allBooks = await getAllBooks();
    return allBooks.filter((book) => book.user_book_id === userBookId);
}

export async function addNewBook(newBook) {
    return set(ref(database, `user/books/${newBook.user_book_id}`), {
        ...newBook,
    });
}
