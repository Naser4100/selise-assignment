import { NextFunction, Request, Response } from 'express';

import {
  addNewProductService,
  deleteProductService,
  updateProductService,
  gelAllProductService,
  getProductDetailsService,
} from '../services/product.service';
import asyncHandler from '../middleware/asyncHandler.middleware';
import { HttpException } from '../exceptions/HttpException';
import { IProduct } from '../interfaces/product.interface';
import { UpdateProductInput, GetAllProductInput } from '../dtos/product.dtos';
import { IPaginateResponse } from '../interfaces/customResponse.interface';

export const addNewProduct = asyncHandler(
  async (
    req: Request<{}, {}, IProduct, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, price, details, sizes, productImages, quantity } = req.body;

    const userId: any = req?.user?._id;

    const newProduct = await addNewProductService({
      name,
      user: userId,
      price,
      details,
      sizes,
      productImages,
      quantity,
    });
    res.status(201).json({
      success: true,
      message: 'New product added successfully',
      newProduct,
    });
  }
);

export const getProductDetails = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.productId;

    if (!productId) {
      throw new HttpException(400, 'Product id is required');
    }

    const product = await getProductDetailsService({
      _id: productId,
      user: req?.user?._id as unknown as string,
    });

    res.status(200).json({
      success: true,
      message: 'Get product details',
      product,
    });
  }
);

export const updateProduct = asyncHandler(
  async (
    req: Request<{}, {}, UpdateProductInput, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const { productId, updatedInfo } = req.body;
    const newProduct = await updateProductService(
      { _id: productId },
      updatedInfo,
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      newProduct,
    });
  }
);

export const deleteProduct = asyncHandler(
  async (
    req: Request<{}, {}, { productId: string }, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const { productId } = req.body;
    const userId = req?.user?._id;
    const deletedProduct = await deleteProductService({
      _id: productId,
      user: userId as any,
    });
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      deletedProduct,
    });
  }
);

export const getAllProduct = asyncHandler(
  async (
    req: Request<{}, {}, GetAllProductInput, {}>,
    res: IPaginateResponse,
    next: NextFunction
  ) => {
    res.status(200).json({
      success: true,
      message: 'Got paginated result',
      totalDocument: res.totalDocument,
      products: res.paginatedResults,
    });
  }
);
