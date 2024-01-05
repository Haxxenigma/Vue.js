import { hash, compare } from 'bcrypt';
import { del } from '../../utils/imgur.js';
import prisma from '../../utils/prisma.js';
import getToken from '../../utils/getToken.js';

export const updateUser = async (req, res) => {
    try {
        const isExist = await prisma.user.findMany({
            where: {
                OR: [
                    {
                        AND: [
                            { name: req.body.name },
                            { NOT: { name: req.params.name } },
                        ],
                    },
                    {
                        AND: [
                            { email: req.body.email },
                            { NOT: { email: req.body.initialEmail } },
                        ],
                    },
                ],
            },
        });

        if (isExist.length) {
            return res.status(400).json({ message: 'Name or email already in use' });
        }

        req.body.birth = req.body.birth ? `${req.body.birth}T00:00:00.000Z` : null;

        await prisma.user.update({
            where: {
                name: req.params.name,
            },
            data: {
                name: req.body.name,
                email: req.body.email,
                bio: req.body.bio,
                birth: req.body.birth,
            },
        });

        let token = null;
        if (req.body.name !== req.params.name) token = getToken(req.body.name);
        res.json({ token, message: 'You have successfully updated your profile settings' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'User update was unsuccessful' });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                name: req.params.name,
            },
        });

        if (user && await compare(req.query.password, user.password)) {
            await prisma.user.delete({
                where: {
                    name: req.params.name,
                },
            });
            if (user.imageHash) await del(user.imageHash);

            return res.json({ message: 'You have successfully deleted your account' });
        }

        res.status(401).json({ message: 'Incorrect password' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'User deletion was unsuccessful' });
    }
};

export const passwordUpdate = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                name: req.params.name,
            },
        });

        if (user && await compare(req.body.password1, user.password)) {
            const passwordHash = await hash(req.body.password2, 10);

            await prisma.user.update({
                where: {
                    name: req.params.name,
                },
                data: {
                    password: passwordHash,
                },
            });

            return res.json({ message: 'You changed your password successfully' });
        }

        res.status(401).json({ message: 'Incorrect password' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'User password update was unsuccessful' });
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                name: req.params.name ? req.params.name : req.userName
            },
        });

        if (!user) {
            return res.status(404).json({ message: 'Not Found' });
        }

        const { password, ...userData } = user;
        res.json({ ...userData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Forbidden' });
    }
};