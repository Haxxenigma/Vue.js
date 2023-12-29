import { post, del } from '../../utils/imgur.js';
import prisma from '../../utils/prisma.js';

export const uploadImage = async (req, res) => {
    try {
        const image = req.file;
        if (!image) throw new Error('No image provided');
        if (image.mimetype !== 'image/png' && image.mimetype !== 'image/jpeg') {
            throw new Error('Only png/jpeg image files accepted');
        }
        if (image.size > 5242880) {
            throw new Error('Please upload an image no larger than 5 MB');
        }
        const user = await prisma.user.findUnique({
            where: {
                name: req.params.name,
            },
            select: {
                image: true,
                imageHash: true,
            },
        });

        if (user.imageHash) await del(user.imageHash);

        const buffer = image.buffer;
        const { link, deletehash } = await post(buffer);

        await prisma.user.update({
            where: {
                name: req.params.name,
            },
            data: {
                image: link,
                imageHash: deletehash,
            },
        });

        res.json({ message: 'You have successfully updated your profile image' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

export const deleteImage = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                name: req.params.name,
            },
            select: {
                imageHash: true,
            },
        });

        if (user.imageHash) await del(user.imageHash);

        await prisma.user.update({
            where: {
                name: req.params.name,
            },
            data: {
                image: '/media/avatar.svg',
                imageHash: null,
            },
        });

        res.json({ message: 'You have successfully deleted your profile image' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Profile image deletion was unsuccessful' });
    }
};