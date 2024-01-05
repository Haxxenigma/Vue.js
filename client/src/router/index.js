import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home';
import About from '@/views/About';
import Blog from '@/views/Blog';
import Signin from '@/views/Signin';
import Signup from '@/views/Signup';
import Settings from '@/views/Settings';
import SettingsGeneral from '@/views/SettingsGeneral';
import SettingsPassword from '@/views/SettingsPassword';
import SettingsAdvanced from '@/views/SettingsAdvanced';
import User from '@/views/User';
import NotFound from '@/views/NotFound';
import OAuth from '@/views/OAuth';
import OAuthGoogle from '@/views/OAuthGoogle';
import OAuthGithub from '@/views/OAuthGithub';
import ArticleForm from '@/views/ArticleForm';
import Article from '@/views/Article';

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        alias: '/home',
    },
    {
        path: '/about',
        name: 'about',
        component: About,
    },
    {
        path: '/blog',
        name: 'blog',
        component: Blog,
    },
    {
        path: '/signin',
        name: 'signin',
        component: Signin,
    },
    {
        path: '/signup',
        name: 'signup',
        component: Signup,
    },
    {
        path: '/settings',
        name: 'settings',
        component: Settings,
        children: [
            {
                path: '',
                name: 'settings-general',
                component: SettingsGeneral,
            },
            {
                path: 'password',
                name: 'settings-password',
                component: SettingsPassword,
            },
            {
                path: 'advanced',
                name: 'settings-advanced',
                component: SettingsAdvanced,
            },
        ],
    },
    {
        path: '/oauth/google',
        name: 'oauth-google',
        component: OAuthGoogle,
    },
    {
        path: '/oauth',
        name: 'oauth',
        component: OAuth,
    },
    {
        path: '/oauth/github',
        name: 'oauth-github',
        component: OAuthGithub,
    },
    {
        path: '/user/:name',
        name: 'user',
        component: User,
        alias: ['/users/:name', '/profile/:name'],
    },
    {
        path: '/articles/:id',
        name: 'articles',
        component: Article,
    },
    {
        path: '/articles/create',
        name: 'articles-create',
        component: ArticleForm,
    },
    {
        path: '/articles/:id/edit',
        name: 'articles-update',
        component: ArticleForm,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;