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
