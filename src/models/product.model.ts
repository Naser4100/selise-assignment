import mongoose from 'mongoose';

import { IProduct } from '../interfaces/product.interface';

export interface ProductDocument extends IProduct, mongoose.Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    details: {
      type: String,
    },

    quantity: {
      type: mongoose.Types.ObjectId,
      ref: 'quantity',
    },

    sizes: [{ type: String }],

    SKU: String,
    productImages: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const ProductModel = mongoose.model<ProductDocument>('product', ProductSchema);

export default ProductModel;
