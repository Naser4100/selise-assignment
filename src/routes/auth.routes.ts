import express from 'express';
import { login } from '../controllers/auth.controller';
import { handleValidations } from '../middleware/validation.middleware';

import { loginValidator } from '../validators/auth.validator';

const router = express.Router();

router.post('/login', handleValidations(loginValidator), login);

export default router;
