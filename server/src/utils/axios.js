import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:4444',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
    },
});

export default axiosInstance;