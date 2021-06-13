import axios from 'axios';

const request = axios.create({
    baseURL: "https://youtube.googleapis.com/youtube/v3/",
    params: {
        key: "AIzaSyDpEQaBlHcpTzjqC55ETzjs3iz235C7FG0",
    }
})

export default request