import getToday from '../calculate/get-today';

export default async function AddWishBook(bookTitle, bookIsbn) {
    const createdDate = getToday();

    if ((bookTitle, bookIsbn)) {
        try {
            await fetch('/api/addBook', {
                method: 'POST',
                body: JSON.stringify({
                    bookIsbn: bookIsbn,
                    bookTitle: bookTitle,
                    createdDate: createdDate,
                    doneDate: '',
                    score: '',
                    status: 'wish',
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((response) => {
                if (response.ok) {
                    alert('책을 등록하였습니다!');
                    return response.json();
                }
                return response.json().then((data) => {
                    throw new Error(data.message || '오류가 발생했습니다.');
                });
            });
        } catch (error) {
            console.error('오류 발생:', error);
        }
    }
}
