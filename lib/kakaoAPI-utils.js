export default class KaKaoAPI {
    constructor() {
        this.baseURL = `https://dapi.kakao.com/v3/search/book`;
        this.headers = {
            method: 'get',
            headers: {
                Authorization:
                    'KakaoAK ' + `${process.env.NEXT_PUBLIC_KAKAOAPI_AUTH_KEY}`,
            },
        };
    }

    async search(pageParam, keyword) {
        const response = await fetch(
            `${this.baseURL}?query=${keyword}&page=${pageParam}`,
            this.headers
        );
        const data = await response.json();
        return data;
    }

    async searchByIsbn(isbn) {
        let bookIsbn;
        if (isbn.length > 12 && isbn.length === 24) {
            const value = isbn;
            const splittedIsbn = value.split(' ');
            splittedIsbn[0]
                ? (bookIsbn = splittedIsbn[0])
                : (bookIsbn = splittedIsbn[1]);
        } else {
            bookIsbn = isbn;
        }

        const response = await fetch(
            `${this.baseURL}?query=${bookIsbn}&target=isbn`,
            this.headers
        );
        const data = await response.json();
        return data;
    }
}
