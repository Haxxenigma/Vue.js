import { watch } from 'vue';
import store from '@/store';
import router from '@/router';

export function useAuth(isAuth, { redirectIfFail }) {
    const token = localStorage.getItem('token');

    if (token) {
        isAuth = true;
        watch(() => store.state.user, () => {
            !redirectIfFail && router.replace(`/user/${store.state.user.name}`);
        });
    } else {
        redirectIfFail && router.replace('/signin');
    }

    return isAuth;
}