import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        if (req.params.name && req.params.name !== decoded.name) throw new Error();
        req.userName = decoded.name;
        next();
    } catch (err) {
        if (err.message === 'jwt expired') {
            return res.status(419).json({ message: 'jwt expired' });
        }
        res.status(403).json({ message: 'Forbidden' });
    }
};