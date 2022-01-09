import { Request, Response } from 'express';
import asyncHandler from '../middleware/asyncHandler.middleware';

import {
  addNewOrderService,
  getOrderDetailsService,
  getClientOrderDetailsService,
} from '../services/order.service';
import { AddNewOrderInput } from '../dtos/order.dtos';
import { HttpException } from '../exceptions/HttpException';

export const addNewOrder = asyncHandler(
  async (req: Request<{}, {}, AddNewOrderInput, {}>, res: Response) => {
    await addNewOrderService(req.body);

    res.status(201).json({
      success: true,
      message: 'New order created successfully',
    });
  }
);

export const getOrderDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const orderId = req.params.orderId;

    const OrderDetails = await getOrderDetailsService(orderId);

    res.status(200).json({
      success: true,
      message: 'Get order details successfully',
      OrderDetails,
    });
  }
);

export const getClientsOrderDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const clientId = req.params.clientId;

    if (!clientId) {
      throw new HttpException(400, 'Client id is required');
    }

    const clientOrderDetails = await getClientOrderDetailsService(clientId);

    res.status(200).json({
      success: true,
      message: "Get client's order details successfully",
      clientOrderDetails,
    });
  }
);
