import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            req.userId = decoded.id;
            next();
        } catch (err) {
            res.status(403).json({ message: err.message });
        }
    } else {
        res.status(403).json({ message: 'No token provided!' });
    }
};