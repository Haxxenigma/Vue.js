import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home';
import About from '@/views/About';
import Blog from '@/views/Blog';
import Signin from '@/views/Signin';
import Signup from '@/views/Signup';
import Settings from '@/views/Settings';
import SetGeneral from '@/views/SetGeneral';
import SetPassword from '@/views/SetPassword';
import SetAdvanced from '@/views/SetAdvanced';
import User from '@/views/User';
import NotFound from '@/views/NotFound';
import GoogleOAuth from '@/views/GoogleOAuth';
import GithubOAuth from '@/views/GithubOAuth';

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        alias: '/home'
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
                component: SetGeneral,
            },
            {
                path: 'password',
                name: 'settings-password',
                component: SetPassword,
            },
            {
                path: 'advanced',
                name: 'settings-advanced',
                component: SetAdvanced,
            },
        ],
    },
    {
        path: '/oauth/google',
        name: 'oauth-google',
        component: GoogleOAuth,
    },
    {
        path: '/oauth/github',
        name: 'oauth-github',
        component: GithubOAuth,
    },
    {
        path: '/user/:name',
        name: 'user',
        component: User,
        alias: ['/users/:name', '/profile/:name'],
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