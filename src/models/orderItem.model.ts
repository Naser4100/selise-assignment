import mongoose from 'mongoose';

import { IOrderItem } from '../interfaces/orderItem.interface';

export interface OrderItemDocument extends IOrderItem, mongoose.Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      ref: 'product',
      required: true,
    },

    orderId: {
      type: mongoose.Types.ObjectId,
      ref: 'order',
    },

    quantity: {
      type: Number,
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    size: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const OrderItemModel = mongoose.model<OrderItemDocument>(
  'order_item',
  OrderItemSchema
);

export default OrderItemModel;
