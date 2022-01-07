import express from 'express';
import passport from 'passport';

import routes from './routes';

import handleError from './middleware/handleError.middleware';
import authMiddleware from './middleware/auth.middleware';

const app = express();
app.use(express.json());

app.use(passport.initialize());
authMiddleware(passport);

routes(app);

app.use(handleError);

export default app;
