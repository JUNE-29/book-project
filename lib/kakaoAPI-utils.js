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
        const response = await fetch(
            `${this.baseURL}?query=${isbn}&target=isbn`,
            this.headers
        );
        const data = await response.json();
        return data;
    }
}
