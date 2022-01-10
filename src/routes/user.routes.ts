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
  '/registration',
  handleValidations(registrationValidator),
  createUser
);
router.post(
  '/set-password',
  handleValidations(setPasswordValidator),
  setPassword
);

export default router;
