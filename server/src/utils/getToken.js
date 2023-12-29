import jwt from 'jsonwebtoken';

export default function getToken(userId) {
    const token = jwt.sign({ id: userId }, process.env.JWT_KEY, { expiresIn: '7d' });
    return token;
}