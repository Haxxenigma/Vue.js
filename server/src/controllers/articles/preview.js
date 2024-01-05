import { post, del } from '../../utils/imgur.js';
import prisma from '../../utils/prisma.js';

export const uploadPreview = async (req, res) => {
    try {
        const image = req.file;

        const article = await prisma.article.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
            select: {
                preview: true,
                previewHash: true,
            },
        });

        if (article.previewHash) await del(article.previewHash);

        if (image) {
            if (image.mimetype !== 'image/png' && image.mimetype !== 'image/jpeg') {
                throw new Error('Only png/jpeg image files accepted');
            }
            if (image.size > 10485760) {
                throw new Error('Please upload an image no larger than 10 MB');
            }

            const buffer = image.buffer;
            const { link, deletehash } = await post(buffer);

            await prisma.article.update({
                where: {
                    id: parseInt(req.params.id),
                },
                data: {
                    preview: link,
                    previewHash: deletehash,
                },
            });
        } else {
            await prisma.article.update({
                where: {
                    id: parseInt(req.params.id),
                },
                data: {
                    preview: null,
                    previewHash: null,
                },
            });
        }

        res.json({ redirect: `/articles/${req.params.id}` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};