import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${process.env.VUE_APP_BASE_URL}:${process.env.VUE_APP_SERVER_PORT}`,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
    },
});

axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token');
    return config;
});

export default axiosInstance;