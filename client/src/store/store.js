import { createStore } from 'vuex';
import axios from '@/utils/axios';

export default createStore({
    state: {
        userData: null,
        isLoading: true,
    },
    getters: {
        async getUserData(state) {
            try {
                return state.userData = (await axios.get('/users')).data;
            } catch (err) {
                return console.error(err);
            } finally {
                return state.isLoading = false;
            }
        }
    },
    mutations: {
    },
    actions: {
    },
    modules: {
    },
});