export default class KaKaoAPI {
    constructor() {
        this.baseURL = `https://dapi.kakao.com/v3/search/book`;
    }

    async search(keyword) {
        const response = await fetch(`${this.baseURL}?query=${keyword}`, {
            method: 'get',
            headers: {
                Authorization:
                    'KakaoAK ' + `${process.env.NEXT_PUBLIC_KAKAOAPI_AUTH_KEY}`,
            },
        });
        const data = await response.json();
        return data;
    }
}
