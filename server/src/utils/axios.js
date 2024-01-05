import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${process.env.BASE_URL}:${process.env.PORT}`,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
    },
});

export default axiosInstance;