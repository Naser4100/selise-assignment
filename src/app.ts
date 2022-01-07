import express from 'express';

import routes from './routes';

import handleError from './middleware/handleError.middleware';

const app = express();
app.use(express.json());

routes(app);

app.use(handleError);

export default app;
