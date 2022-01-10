import {
  DocumentDefinition,
  ObjectId,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';

import { v4 as uuid } from 'uuid';
import { IOrderItem } from '../interfaces/orderItem.interface';
import ProductModel, { ProductDocument } from '../models/product.model';
import QuantityModel from '../models/quantity.model';
import ClientModel from '../models/client.model';
import OrderModel from '../models/order.model';
import OrderItemModel from '../models/orderItem.model';

import { AddNewOrderInput } from '../dtos/order.dtos';

// Add new order
export const addNewOrderService = async (
  newOrder: DocumentDefinition<AddNewOrderInput>
) => {
  const { productList, name, email, phone } = newOrder;
  try {
    const client = await ClientModel.create({ name, email, phone });
    const order = await OrderModel.create({
      orderId: uuid(),
      clientId: client._id,
    });

    Promise.all(
      productList.map(async (product) => {
        await OrderItemModel.create({
          productId: product.productId,
          orderId: order._id,
          quantity: parseInt(product.quantity),
          totalPrice: parseInt(product.totalPrice),
          size: product.size,
        });
        await QuantityModel.findOneAndUpdate(
          { productId: product.productId },
          { $inc: { quantity: -parseInt(product.quantity) } },
          { new: true }
        );
      })
    );
  } catch (error: any) {
    throw new Error(error);
  }
};

// Get order details
export const getOrderDetailsService = async (orderId: string) => {
  try {
    const client = await OrderModel.findById(orderId).populate(
      'clientId',
      'name email phone -_id'
    );

    const orderedItems = await OrderItemModel.find({ orderId })
      .populate({
        path: 'productId',
        select: '-_id -user -createdAt -updatedAt',
        populate: {
          path: 'quantity',
          select: 'quantity -_id',
        },
      })
      .select('quantity totalPrice size -_id');

    return {
      client: client.clientId,
      orderedItems,
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

// Get client details
export const getClientOrderDetailsService = async (clientId: string) => {
  try {
    const orders = await OrderModel.find({ clientId });

    const orderIds = orders.map((order) => order._id);

    const orderedItems = await OrderItemModel.find({
      orderId: { $in: orderIds },
    })
      .populate({
        path: 'productId',
        select: '-_id -user -createdAt -updatedAt',
        populate: {
          path: 'quantity',
          select: 'quantity -_id',
        },
      })
      .select('quantity totalPrice size -_id');

    return orderedItems;
  } catch (error: any) {
    throw new Error(error);
  }
};
