import express from 'express';
import passport from 'passport';
import { login, logout } from '../controllers/auth.controller';
import { handleValidations } from '../middleware/validation.middleware';

import { loginValidator } from '../validators/auth.validator';

const router = express.Router();

router.post('/login', handleValidations(loginValidator), login);
router.post(
  '/logout',
  passport.authenticate('jwt', { session: false }),
  logout
);

export default router;
