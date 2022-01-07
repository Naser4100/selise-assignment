import { Express, Request, Response } from 'express';
import passport from 'passport';
import { createUser } from './controllers/user.controller';

const routes = (app: Express) => {
  app.get(
    '/health',
    passport.authenticate('jwt', { session: false }),
    (req: Request, res: Response) => {
      res
        .status(200)
        .json({ success: true, message: 'Server is up and running' });
    }
  );

  app.post('/api/users', createUser);
};

export default routes;
