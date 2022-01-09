import express from 'express';
import passport from 'passport';
import {
  addNewProduct,
  deleteProduct,
  getAllProduct,
  getProductDetails,
  updateProduct,
} from '../controllers/product.controller';
import { handleValidations } from '../middleware/validation.middleware';
import { paginatedResults } from '../middleware/pagination.middleware';

import {
  productValidator,
  updateProductValidator,
} from '../validators/product.validator';

import ProductModel from '../models/product.model';

const router = express.Router();

router.post(
  '/product',
  passport.authenticate('jwt', { session: false }),
  handleValidations(productValidator),
  addNewProduct
);

router.patch(
  '/product',
  passport.authenticate('jwt', { session: false }),
  handleValidations(updateProductValidator),
  updateProduct
);

router.delete(
  '/product',
  passport.authenticate('jwt', { session: false }),
  deleteProduct
);

router.post(
  '/products',
  passport.authenticate('jwt', { session: false }),
  paginatedResults(ProductModel),
  getAllProduct
);

router.post(
  '/products/:productId',
  passport.authenticate('jwt', { session: false }),
  getProductDetails
);

export default router;
