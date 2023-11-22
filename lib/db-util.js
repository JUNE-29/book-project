import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set, remove, update } from 'firebase/database';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// books

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
    const allReadBooks = allBooks.filter(
        (book) => book.user_book_status === 'done'
    );
    const sortedReadBooksBydoneDate = allReadBooks;
    sortedReadBooksBydoneDate.sort(
        (a, b) =>
            new Date(b.user_book_done_date) - new Date(a.user_book_done_date)
    );
    return sortedReadBooksBydoneDate;
}

export async function getWishBooks() {
    const allBooks = await getAllBooks();
    const allWishBooks = allBooks.filter(
        (book) => book.user_book_status === 'wish'
    );
    const sortedWishBooksByCreatedDate = allWishBooks;
    sortedWishBooksByCreatedDate.sort(
        (a, b) =>
            new Date(b.user_book_create_date) -
            new Date(a.user_book_create_date)
    );
    return sortedWishBooksByCreatedDate;
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

export async function updateDoneBook(userBookId, rate, doneDate, updatedDate) {
    return update(ref(database, `user/books/${userBookId}`), {
        user_book_done_date: doneDate,
        user_book_star_score: rate,
        user_book_update_date: updatedDate,
    });
}

export async function removeBookfromDB(userBookId) {
    return remove(ref(database, `user/books/${userBookId}`));
}

// review
export async function getAllReviews() {
    const allReviews = await get(ref(database, 'user/book_review')).then(
        (snapshot) => {
            if (snapshot.exists()) {
                const allReviews = snapshot.val();
                return Object.values(allReviews);
            } else {
                console.log('No data available');
            }
        }
    );

    const sortedReviewByCrDate = allReviews;
    sortedReviewByCrDate.sort(
        (a, b) => new Date(b.create_date) - new Date(a.create_date)
    );

    return sortedReviewByCrDate;
}

export async function addReview(newReview) {
    return set(ref(database, `user/book_review/${newReview.review_id}`), {
        ...newReview,
    });
}

// transcription

export async function getAllTranscriptions() {
    const transcriptions = await get(
        ref(database, 'user/book_transcription')
    ).then((snapshot) => {
        if (snapshot.exists()) {
            const allTranscriptions = snapshot.val();
            return Object.values(allTranscriptions);
        } else {
            console.log('No data available');
        }
    });

    const sortByCreateDate = transcriptions;
    sortByCreateDate.sort(
        (a, b) => new Date(b.create_date) - new Date(a.create_date)
    );

    return sortByCreateDate;
}
