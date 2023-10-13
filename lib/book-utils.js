import path from 'path';
import fs from 'fs/promises';

export async function getAllBooks() {
    const filePath = path.join(process.cwd(), 'data', 'dummy-data.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);

    return data;
}

export async function getDoneBook() {
    const allBooks = await getAllBooks();
    return allBooks.books.filter((book) => book.user_book_status === 'done');
}

export async function getWishBook() {
    const allBooks = await getAllBooks();
    return allBooks.books.filter((book) => book.user_book_status === 'wish');
}

export async function getFilteredDoneBookCreatedYear() {
    const doneBooks = await getDoneBook();
    const doneBooksCrDate = [];
    doneBooks.map((book) => {
        const splitedDate = book.user_book_create_date.split('-');
        const year = splitedDate[0];
        doneBooksCrDate.push(year);
    });
    doneBooksCrDate.sort((a, b) => {
        if (a > b) {
            return -1;
        }
        if (a < b) {
            return 1;
        }
        return 0;
    });
    return doneBooksCrDate;
}

export async function getFilteredDoneBookList(year) {
    const doneBooks = await getDoneBook();
    return doneBooks.filter((book) =>
        book.user_book_create_date.includes(year)
    );
}
