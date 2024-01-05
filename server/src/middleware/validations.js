import { body, query } from 'express-validator';

function sanitize(value) {
    return value.replace(/[^a-zA-Z0-9_]/g, '_');
}

export const signupValidation = [
    body('name', 'Enter your name').trim().notEmpty().customSanitizer((value) => {
        return sanitize(value);
    }),
    body('email', 'Incorrect email format').isEmail(),
    body('password', 'Password must be at least 6 characters').trim().isLength({ min: 6 }),
];

export const oauthValidation = [
    body('name', 'Enter your name').trim().notEmpty().customSanitizer((value) => {
        return sanitize(value);
    }),
    body('email', 'Incorrect email format').isEmail(),
    body('password1', 'Password must be at least 6 characters').trim().isLength({ min: 6 }),
    body('password2', 'The password confirmation must match the new password').custom((value, { req }) => {
        return value === req.body.password1;
    }),
];

export const signinValidation = [
    body('name', 'Enter your name').notEmpty(),
    body('password', 'Password is required').notEmpty(),
];

export const updateValidation = [
    body('name', 'Name is required').trim().notEmpty().customSanitizer((value) => {
        return sanitize(value);
    }),
    body('email', 'Incorrect email format').isEmail(),
    body('birth', 'Incorrect date format').optional({ values: 'falsy' }).isDate(),
];

export const passwordValidation = [
    body('password1', 'Enter your old password').notEmpty(),
    body('password2', 'Password must be at least 6 characters').trim().isLength({ min: 6 }),
    body('password3', 'The password confirmation must match the new password').custom((value, { req }) => {
        return value === req.body.password2;
    }),
];

export const userDeletionValidation = [
    query('password', 'Enter your password').notEmpty(),
];

export const articleValidation = [
    body('title', 'Title is required').notEmpty(),
    body('tags').trim().customSanitizer((value) => {
        return value.split(' ');
    }),
    body('content', 'Content is required').notEmpty(),
];