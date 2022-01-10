import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import asyncHandler from '../middleware/asyncHandler.middleware';
import pdfGenerator from '../utils/pdfGenerator';

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

export const generatePDF = asyncHandler(async (req: Request, res: Response) => {
  const clientId = req.params.clientId;

  if (!clientId) {
    throw new HttpException(400, 'Client id is required');
  }

  const clientOrderDetails = await getClientOrderDetailsService(clientId);

  pdfGenerator(clientId, clientOrderDetails, res);

  // res.status(200).download(path.join(__dirname, `../../pdf/${clientId}.pdf`));
  // res.setHeader('Content-type', 'application/pdf');
  // res.download(path.join(__dirname, `../../pdf/${clientId}.pdf`));
  // res.status(200).json({ success: true });
});
