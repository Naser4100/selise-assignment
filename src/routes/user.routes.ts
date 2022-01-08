import express from 'express';
import passport from 'passport';
import { createUser, setPassword } from '../controllers/user.controller';
import { handleValidations } from '../middleware/validation.middleware';
import {
  registrationValidator,
  setPasswordValidator,
} from '../validators/user.validator';

const router = express.Router();

router.post(
  '/api/users/registration',
  handleValidations(registrationValidator),
  createUser
);
router.post(
  '/api/users/set-password',
  handleValidations(setPasswordValidator),
  setPassword
);

router.get(
  '/test-auth',
  passport.authenticate('jwt', { session: false }),
  (req, res) => res.send('Authenticated API')
);

export default router;
