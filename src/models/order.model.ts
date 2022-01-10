import mongoose from 'mongoose';

import { IOrder } from '../interfaces/order.interface';

export interface OrderDocument extends IOrder, mongoose.Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
    },

    clientId: {
      type: mongoose.Types.ObjectId,
      ref: 'client',
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model<OrderDocument>('order', OrderSchema);

export default Order;
