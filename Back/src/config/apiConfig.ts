import expreess from 'express';

const weatherApiConfig = () => {
    url : "https://apihub.kma.go.kr/api/typ01/url/kma_sfctm2.php"
    tm : 0 // 0이거나 없으면 현재시간
    stn : 0 // 0이거나 없으면 전체
    help : 0 // 1이면 약간의 설명 추가. 0이면 없음
    authKey : 'eLyv7laHRfq8r-5Wh5X6cQ'
}

export {
    weatherApiConfig,
}
