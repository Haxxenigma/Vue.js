import { passwordValidation, signinValidation, signupValidation, updateValidation, userDeletionValidation } from './middleware/validations.js';
import { deleteUser, getUser, passwordUpdate, updateUser } from './controllers/users/index.js';
import { githubOAuth, googleOAuth } from './controllers/authentication/oauth.js';
import { deleteImage, uploadImage } from './controllers/users/image.js';
import { signin, signup } from './controllers/authentication/index.js';
import validate from './middleware/validate.js';
import checkAuth from './middleware/checkAuth.js';
import express from 'express';
import multer from 'multer';
import cors from 'cors';

const app = express();
const port = 4444;
const upload = multer({
    storage: multer.memoryStorage(),
});

app.use(express.json());
app.use(cors({
    origin: [
        'http://localhost:8080',
        'http://192.168.1.93:8080',
    ],
}));

app.post('/signup', signupValidation, validate, signup);
app.post('/signin', signinValidation, validate, signin);
app.patch('/users/:name', checkAuth, updateValidation, validate, updateUser);
app.delete('/users/:name', checkAuth, userDeletionValidation, validate, deleteUser);
app.post('/users/:name/image', checkAuth, upload.single('image'), uploadImage);
app.delete('/users/:name/image', checkAuth, deleteImage);
app.patch('/users/:name/password', checkAuth, passwordValidation, validate, passwordUpdate);
app.get('/oauth/google', googleOAuth);
app.get('/oauth/github', githubOAuth);
app.get('/users', checkAuth, getUser);
app.get('/users/:name', getUser);
app.get('/', (req, res) => {
    res.json({ message: `Hello! Welcome to ${req.hostname}` });
});

app.listen(port, (err) => {
    if (err) return console.log(err);
    console.log(`Server is running on http://localhost:${port}`);
});