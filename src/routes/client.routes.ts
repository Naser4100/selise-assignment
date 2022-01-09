import express from 'express';
import passport from 'passport';
import {
  addNewOrder,
  getClientsOrderDetails,
  getOrderDetails,
} from '../controllers/order.controller';

const router = express.Router();

router.post(
  '/:clientId',
  passport.authenticate('jwt', { session: false }),
  getClientsOrderDetails
);

export default router;
