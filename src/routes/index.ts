import express from 'express';

import auth from './auth.routes';
import user from './user.routes';
import product from './product.routes';
import order from './order.routes';
import client from './client.routes';

const router = express.Router();

router.use('/api/auth', auth);
router.use('/api/users', user);
router.use('/api', product);
router.use('/api', order);
router.use('/api/clients', client);

export default router;
