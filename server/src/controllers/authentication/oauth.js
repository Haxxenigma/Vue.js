import { getGoogleToken, getGoogleUser } from '../../utils/googleOAuth.js';
import { getGithubToken, getGithubUser } from '../../utils/githubOAuth.js';
import { hash } from 'bcrypt';
import prisma from '../../utils/prisma.js';
import getToken from '../../utils/getToken.js';

export const oauth = async (req, res) => {
    const isExist = await prisma.user.findMany({
        where: {
            OR: [
                { name: req.body.name },
                { email: req.body.email },
            ],
        },
    });

    if (isExist.length) {
        return res.status(400).json({ message: 'Name or email already in use' });
    }

    const passwordHash = await hash(req.body.password1, 10);

    const user = await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            password: passwordHash,
            verified: req.body.verified,
            provider: req.body.provider,
        },
    });

    const token = getToken(user.name);
    res.json({
        token, name: user.name,
        message: `You have successfully signed in as ${user.name}`,
    });
};

export const googleOAuth = async (req, res) => {
    try {
        const code = req.query.code;
        if (!code) throw new Error('code not provided');
        const { id_token, access_token } = await getGoogleToken(code);
        const googleUser = await getGoogleUser(id_token, access_token);

        const user = await prisma.user.findUnique({
            where: {
                email: googleUser.email,
            },
        });

        if (!user) {
            return res.json({
                new: true, user: { ...googleUser },
            });
        }

        const token = getToken(user.name);
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

        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!user) {
            return res.json({
                new: true, user: { login, avatar_url, email, verified },
            });
        }

        const token = getToken(user.name);
        res.json({
            token, name: user.name,
            message: `You have successfully signed in as ${user.name}`,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'GitHub OAuth authentication was unsuccessful' });
    }
};