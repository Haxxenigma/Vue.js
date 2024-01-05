import { createStore } from 'vuex';
import axios from '@/utils/axios';
import router from '@/router';

export default createStore({
    state: {
        user: null,
        articles: null,
        isError403: false,
        isUserLoading: true,
        isArticlesLoading: true,
        tempUserData: null,
    },
    getters: {
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setArticles(state, articles) {
            state.articles = articles;
        },
        setTempUserData(state, tempUserData) {
            state.tempUserData = tempUserData;
        },
    },
    actions: {
        async fetchUser({ commit, state }) {
            try {
                const res = await axios.get('/users');
                commit('setUser', res.data);
            } catch (err) {
                state.isError403 = err.response?.status === 403;
                if (err.response?.status === 419) {
                    localStorage.removeItem('token');
                    sessionStorage.setItem('popup', 'Session expired');
                    router.replace('/signin');
                    setTimeout(() => {
                        router.go(0);
                    }, 100);
                }
            } finally {
                state.isUserLoading = false;
            }
        },
        async fetchArticles({ commit, state }) {
            try {
                const res = await axios.get('/articles');
                commit('setArticles', res.data);
            } catch (err) {
                console.error(err);
            } finally {
                state.isArticlesLoading = false;
            }
        },
    },
    modules: {
    },
});