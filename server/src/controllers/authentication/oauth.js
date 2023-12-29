import { getGoogleToken, getGoogleUser } from '../../utils/googleOAuth.js';
import { getGithubToken, getGithubUser } from '../../utils/githubOAuth.js';
import { hash } from 'bcrypt';
import prisma from '../../utils/prisma.js';
import getToken from '../../utils/getToken.js';

export const googleOAuth = async (req, res) => {
    try {
        const code = req.query.code;
        if (!code) throw new Error('code not provided');
        const { id_token, access_token } = await getGoogleToken(code);
        const googleUser = await getGoogleUser(id_token, access_token);

        const user = await prisma.user.upsert({
            where: {
                email: googleUser.email,
            },
            update: {
                email: googleUser.email,
            },
            create: {
                email: googleUser.email,
                name: googleUser.given_name.replace(/[^a-zA-Z0-9_]/g, '_'),
                password: await hash(googleUser.email, 10),
                image: googleUser.picture,
                verified: googleUser.verified_email,
                provider: 'google',
            },
        });

        const token = getToken(user.id);
        res.json({
            token, name: user.name,
            message: `You have successfully signed in as ${user.name}`,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Google OAuth authentication was unsuccessful' });
    }
};

export const githubOAuth = async (req, res) => {
    try {
        const code = req.query.code;
        if (!code) throw new Error('code not provided');
        const { access_token } = await getGithubToken(code);
        const { login, avatar_url, email, verified } = await getGithubUser(access_token);

        const user = await prisma.user.upsert({
            where: {
                email: email,
            },
            update: {
                email: email,
            },
            create: {
                email: email,
                name: login.replace(/[^a-zA-Z0-9_]/g, '_'),
                password: await hash(email, 10),
                image: avatar_url,
                verified: verified,
                provider: 'github',
            },
        });

        const token = getToken(user.id);
        res.json({
            token, name: user.name,
            message: `You have successfully signed in as ${user.name}`,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'GitHub OAuth authentication was unsuccessful' });
    }
};