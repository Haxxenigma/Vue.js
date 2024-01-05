import axios from '@/utils/axios';
import router from '@/router';
import store from '@/store';

export async function useOAuth(url, code) {
    try {
        const res = await axios.get(url, { params: { code } });

        if (res.data.new) {
            store.commit('setTempUserData', res.data.user);
            return router.replace('/oauth');
        }

        localStorage.setItem('token', res.data.token);
        sessionStorage.setItem('popup', res.data.message);
        router.replace(`/user/${res.data.name}`);
        setTimeout(() => {
            router.go(0);
        }, 100);
    } catch (err) {
        sessionStorage.setItem('popup-err', err.response.data.message);
        router.replace('/signin');
        setTimeout(() => {
            router.go(0);
        }, 100);
    }
}