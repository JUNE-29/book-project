import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set, remove, update } from 'firebase/database';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// books

export async function getAllBooks(userEmail) {
    const allBooks = await get(ref(database, `${userEmail}/books`)).then(
        (snapshot) => {
            if (snapshot.exists()) {
                const allBooks = snapshot.val();
                return Object.values(allBooks);
            } else {
                console.log('No data available');
            }
        }
    );

    return allBooks;
}

export async function getDoneBooks(userEmail) {
    const allBooks = await getAllBooks(userEmail);
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

export async function getWishBooks(userEmail) {
    const allBooks = await getAllBooks(userEmail);
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

export async function getFilteredDoneBookCreatedYear(userEmail) {
    const doneBooks = await getDoneBooks(userEmail);
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

export async function getFilteredDoneBookList(year, userEmail) {
    const doneBooks = await getDoneBooks(userEmail);
    return doneBooks.filter((book) =>
        book.user_book_create_date.includes(year)
    );
}

export async function selectBookByBookId(userBookId, userEmail) {
    const allBooks = await getAllBooks(userEmail);
    return allBooks.filter((book) => book.user_book_id === userBookId);
}

export async function addNewBook(newBook, userEmail) {
    return set(ref(database, `${userEmail}/books/${newBook.user_book_id}`), {
        ...newBook,
    });
}

export async function updateDoneBook(
    userBookId,
    rate,
    doneDate,
    updatedDate,
    userEmail
) {
    return update(ref(database, `${userEmail}/books/${userBookId}`), {
        user_book_done_date: doneDate,
        user_book_star_score: rate,
        user_book_update_date: updatedDate,
    });
}

export async function removeBookfromDB(userBookId, userEmail) {
    return remove(ref(database, `${userEmail}/books/${userBookId}`));
}

// review
export async function getAllReviews(userEmail) {
    const allReviews = await get(
        ref(database, `${userEmail}/book_review`)
    ).then((snapshot) => {
        if (snapshot.exists()) {
            const allReviews = snapshot.val();
            return Object.values(allReviews);
        } else {
            console.log('No data available');
        }
    });

    const sortedReviewByCrDate = allReviews;
    sortedReviewByCrDate.sort(
        (a, b) => new Date(b.create_date) - new Date(a.create_date)
    );

    return sortedReviewByCrDate;
}

export async function addReview(newReview, userEmail) {
    return set(
        ref(database, `${userEmail}/book_review/${newReview.review_id}`),
        {
            ...newReview,
        }
    );
}

export async function selectReviewByReviewId(reviewId, userEmail) {
    const allReviews = await getAllReviews(userEmail);
    return allReviews.filter((review) => review.review_id === reviewId);
}

export async function removeReviewfromDB(reviewId, userEmail) {
    return remove(ref(database, `${userEmail}/book_review/${reviewId}`));
}

export async function updateReview(
    reviewId,
    reviewTitle,
    reviewContent,
    editDate,
    emojiUniCode,
    userEmail
) {
    return update(ref(database, `${userEmail}/book_review/${reviewId}`), {
        review_title: reviewTitle,
        review_content: reviewContent,
        edited_date: editDate,
        emoji_unicode: emojiUniCode,
    });
}

// transcription

export async function getAllTranscriptions(userEmail) {
    const transcriptions = await get(
        ref(database, `${userEmail}/book_transcription`)
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

export async function addTranscription(newTranscription, userEmail) {
    return set(
        ref(
            database,
            `${userEmail}/book_transcription/${newTranscription.transcription_id}`
        ),
        {
            ...newTranscription,
        }
    );
}

export async function selectTransciptionByTranscId(transcId, userEmail) {
    const AllTranscriptions = await getAllTranscriptions(userEmail);
    return AllTranscriptions.filter(
        (contents) => contents.transcription_id === transcId
    );
}

export async function updateTrnascription(
    transcriptionId,
    color,
    bookPage,
    transcriptionContents,
    editDate,
    userEmail
) {
    return update(
        ref(database, `${userEmail}/book_transcription/${transcriptionId}`),
        {
            transcription_id: transcriptionId,
            transcription_content: transcriptionContents,
            color: color,
            book_page: bookPage,
            edited_date: editDate,
        }
    );
}

export async function removeTranscriptionFromDB(transcId, userEmail) {
    return remove(ref(database, `${userEmail}/book_transcription/${transcId}`));
}
