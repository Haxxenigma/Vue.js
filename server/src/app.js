import { articleValidation, oauthValidation, passwordValidation, signinValidation, signupValidation, updateValidation, userDeletionValidation } from './middleware/validations.js';
import { createArticle, deleteArticle, getArticle, getArticles, updateArticle } from './controllers/articles/index.js';
import { deleteUser, getUser, passwordUpdate, updateUser } from './controllers/users/index.js';
import { githubOAuth, googleOAuth, oauth } from './controllers/authentication/oauth.js';
import { deleteImage, uploadImage } from './controllers/users/image.js';
import { signin, signup } from './controllers/authentication/index.js';
import { uploadPreview } from './controllers/articles/preview.js';
import checkAuth from './middleware/checkAuth.js';
import validate from './middleware/validate.js';
import express from 'express';
import multer from 'multer';
import cors from 'cors';

const app = express();
const port = process.env.PORT;
const hostname = process.env.HOSTNAME;
const upload = multer({
    storage: multer.memoryStorage(),
});

app.use(express.json());
app.use(cors());

app.post('/signup', signupValidation, validate, signup);
app.post('/signin', signinValidation, validate, signin);
app.patch('/users/:name', checkAuth, updateValidation, validate, updateUser);
app.delete('/users/:name', checkAuth, userDeletionValidation, validate, deleteUser);
app.patch('/users/:name/password', checkAuth, passwordValidation, validate, passwordUpdate);
app.post('/users/:name/image', checkAuth, upload.single('image'), uploadImage);
app.delete('/users/:name/image', checkAuth, deleteImage);
app.post('/oauth', oauthValidation, validate, oauth);
app.get('/oauth/google', googleOAuth);
app.get('/oauth/github', githubOAuth);
app.get('/users', checkAuth, getUser);
app.get('/users/:name', getUser);
app.post('/articles', checkAuth, articleValidation, validate, createArticle);
app.patch('/articles/:id', checkAuth, articleValidation, validate, updateArticle);
app.patch('/articles/:id/preview', checkAuth, upload.single('preview'), uploadPreview);
app.delete('/articles/:id', checkAuth, deleteArticle);
app.get('/articles', getArticles);
app.get('/articles/:id', getArticle);
app.get('/', (req, res) => {
    res.send(`Hello! Welcome to ${req.hostname}`);
});
app.use('*', (_, res) => {
    res.status(404).json({ message: 'Not Found' });
});

app.listen(port, hostname, (err) => {
    if (err) return console.log(err);
    console.log(`Server is running on ${process.env.BASE_URL}:${port}`);
});