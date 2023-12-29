import router from '@/router/router';
import axios from '@/utils/axios';

export async function useOAuth(url, code) {
    try {
        const res = await axios.get(url, { params: { code } });
        localStorage.setItem('token', res.data.token);
        sessionStorage.setItem('popup', res.data.message);
        router.replace(`/user/${res.data.name}`);
        setTimeout(() => {
            router.go(0);
        }, 100);
    } catch (err) {
        router.replace('/');
        setTimeout(() => {
            router.go(0);
        }, 100);
        sessionStorage.setItem('popup-err', err.response.data.message);
    }
}