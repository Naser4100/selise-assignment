import express from 'express';

import auth from './auth.routes';
import user from './user.routes';
import product from './product.routes';

const router = express.Router();

router.use('/api/auth', auth);
router.use('/api/users', user);
router.use('/api', product);

export default router;
