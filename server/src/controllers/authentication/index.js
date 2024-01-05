import { hash, compare } from 'bcrypt';
import prisma from '../../utils/prisma.js';
import getToken from '../../utils/getToken.js';

export const signup = async (req, res) => {
    try {
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

        const passwordHash = await hash(req.body.password, 10);

        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: passwordHash,
            },
        });

        const token = getToken(user.name);
        return res.json({
            token, redirect: `/user/${user.name}`,
            message: `You have successfully signed in as ${user.name}`,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Sign up was unsuccessful' });
    }
};

export const signin = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                name: req.body.name,
            },
        });

        if (user && await compare(req.body.password, user.password)) {
            const token = getToken(user.name);
            return res.json({
                token, redirect: `/user/${user.name}`,
                message: `You have successfully signed in as ${user.name}`,
            });
        }

        res.status(400).json({ message: 'Incorrect login or password' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Sign in was unsuccessful' });
    }
};