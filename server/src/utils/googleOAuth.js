import axios from './axios.js';

export async function getGoogleToken(code) {
    const url = 'https://oauth2.googleapis.com/token';
    const options = {
        code: code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code',
    };

    try {
        const res = await axios.post(url, options);
        return res.data;
    } catch (err) {
        console.error(err);
    }
}

export async function getGoogleUser(id_token, access_token) {
    try {
        const res = await axios.get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`, {
            headers: {
                Authorization: `Bearer ${id_token}`,
            },
        });

        return res.data;
    } catch (err) {
        console.error(err);
    }
}