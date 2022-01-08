import express from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';

import router from './routes';

import handleError from './middleware/handleError.middleware';
import authMiddleware from './middleware/auth.middleware';

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());
authMiddleware(passport);

app.use(router);

app.use(handleError);

export default app;
