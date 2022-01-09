import express from 'express';
import passport from 'passport';
import { addNewOrder, getOrderDetails } from '../controllers/order.controller';
import { handleValidations } from '../middleware/validation.middleware';

import { addNewOrderValidator } from '../validators/order.validator';

const router = express.Router();

router.post(
  '/order',
  passport.authenticate('jwt', { session: false }),
  handleValidations(addNewOrderValidator),
  addNewOrder
);

router.post(
  '/orders/:orderId',
  passport.authenticate('jwt', { session: false }),
  getOrderDetails
);

export default router;
