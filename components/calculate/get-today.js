export default function getToday() {
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (1 + date.getMonth())).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
}

export function calculateKoreanTime() {
    const currentDate = new Date();
    const koreanOptions = { timeZone: 'Asia/Seoul' };
    const koreanTime = currentDate.toLocaleString('ko-KR', koreanOptions);
    const parts = koreanTime.split(/[.\s,\/:]+/);

    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    let hour;
    if (parts[3] === '오전') {
        const am = `0${parts[4]}`;
        hour = am;
    } else if (parts[3] === '오후') {
        const pm = parseInt(parts[4]) + 12;
        hour = pm;
    }

    const miutes = parts[5];
    const sec = parts[6];

    const koreanDate = `${year}-${month}-${day} ${hour}:${miutes}:${sec}`;

    return koreanDate;
}

export function printDateWithYYMMDD(createdDate) {
    const date = createdDate;
    const splitedDate = date.split(' ');
    return splitedDate[0];
}
