import axios from './axios.js';

export async function getGithubToken(code) {
    const url = 'https://github.com/login/oauth/access_token';
    const options = {
        code: code,
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
    };

    try {
        const res = await axios.post(url, options);
        return res.data;
    } catch (err) {
        console.error(err);
    }
}

export async function getGithubUser(access_token) {
    try {
        const githubUser = (await axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `bearer ${access_token}`,
            },
        })).data;

        const [githubUserEmail] = (await axios.get('https://api.github.com/user/emails', {
            headers: {
                Authorization: `bearer ${access_token}`,
            },
        })).data;

        const { login, avatar_url, email, verified } = { ...githubUser, ...githubUserEmail };
        return { login, avatar_url, email, verified };
    } catch (err) {
        console.error(err);
    }
}