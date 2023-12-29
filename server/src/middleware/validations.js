import { body, query } from 'express-validator';

export const signupValidation = [
    body('name', 'Enter your name').isLength({ min: 1 }),
    body('email', 'Incorrect email format').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
];

export const signinValidation = [
    body('name', 'Enter your name').isLength({ min: 1 }),
    body('password', 'Password is required').isLength({ min: 1 }),
];

export const updateValidation = [
    body('name', 'Name is required').isLength({ min: 1 }),
    body('email', 'Incorrect email format').isEmail(),
];

export const passwordValidation = [
    body('password1', 'Enter your old password').isLength({ min: 1 }),
    body('password2', 'Password must be at least 6 characters').isLength({ min: 6 }),
    body('password3', 'The password confirmation must match the new password').custom((value, { req }) => {
        return value === req.body.password2;
    }),
];

export const userDeletionValidation = [
    query('password', 'Enter your password').isLength({ min: 1 }),
];