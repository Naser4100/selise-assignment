import express from 'express';
import passport from 'passport';
import {
  addNewOrder,
  generatePDF,
  getOrderDetails,
} from '../controllers/order.controller';
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

router.post(
  '/orders/clients/:clientId/download',
  passport.authenticate('jwt', { session: false }),
  generatePDF
);

export default router;
