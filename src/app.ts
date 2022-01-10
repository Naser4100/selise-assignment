import express from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import config from 'config';

declare global {
  namespace Express {
    interface User {
      _id: string;
    }
  }
}

import router from './routes';

import handleError from './middleware/handleError.middleware';
import authMiddleware from './middleware/auth.middleware';

const app = express();
app.use(express.json());
app.use(cookieParser());

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'REST API',
      version: '1.0.0',
      description: 'Example docs',
    },
  },
  apis: ['swagger.yaml'],
};

const specs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(passport.initialize());
authMiddleware(passport);

app.use(router);

app.use(handleError);

export default app;
