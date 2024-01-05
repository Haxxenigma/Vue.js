import { del } from '../../utils/imgur.js';
import prisma from '../../utils/prisma.js';

export const createArticle = async (req, res) => {
    try {
        const article = await prisma.article.create({
            data: {
                title: req.body.title,
                tags: req.body.tags,
                content: req.body.content,
                authorName: req.userName,
            },
        });

        res.json({
            ...article,
            message: `You have successfully created an article`,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Article creation was unsuccessful' });
    }
};

export const updateArticle = async (req, res) => {
    try {
        const article = await prisma.article.update({
            where: {
                id: parseInt(req.params.id),
            },
            data: {
                title: req.body.title,
                tags: req.body.tags,
                content: req.body.content,
            },
        });

        res.json({
            ...article,
            message: `You have successfully updated an article`,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Article update was unsuccessful' });
    }
};

export const deleteArticle = async (req, res) => {
    try {
        const article = await prisma.article.delete({
            where: {
                id: parseInt(req.params.id),
            },
        });

        if (article.previewHash) await del(article.previewHash);

        res.json({
            message: `You have successfully deleted an article`,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Article deletion was unsuccessful' });
    }
};

export const getArticles = async (_, res) => {
    try {
        const article = await prisma.article.findMany({
            orderBy: {
                updatedAt: 'desc',
            },
            include: {
                author: {
                    select: { image: true },
                },
            },
        });

        res.json(article);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Articles fetch was unsuccessful' });
    }
};

export const getArticle = async (req, res) => {
    try {
        const article = await prisma.article.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
            include: {
                author: {
                    select: { image: true },
                },
            },
        });

        if (!article) {
            return res.status(404).json({ message: 'Not Found' });
        }

        res.json(article);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Article fetch was unsuccessful' });
    }
};