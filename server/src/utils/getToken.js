import jwt from 'jsonwebtoken';

export default function getToken(name) {
    const token = jwt.sign(
        { name },
        process.env.JWT_KEY,
        {
            expiresIn: '2d',
        },
    );
    return token;
}