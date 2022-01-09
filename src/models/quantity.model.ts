import mongoose from 'mongoose';

import { IQuantity } from '../interfaces/quantity.interface';

export interface QuantityDocument extends IQuantity, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const QuantitySchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      ref: 'product',
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const QuantityModel = mongoose.model<QuantityDocument>(
  'quantity',
  QuantitySchema
);

export default QuantityModel;
