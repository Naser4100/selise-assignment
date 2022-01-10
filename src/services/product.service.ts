import {
  DocumentDefinition,
  ObjectId,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';
import { v4 as uuid } from 'uuid';
import { IProduct } from '../interfaces/product.interface';
import ProductModel, { ProductDocument } from '../models/product.model';
import QuantityModel from '../models/quantity.model';

// Get all product
export const gelAllProductService = async (
  query: DocumentDefinition<{ user: string }>
) => {
  try {
    const products = await ProductModel.find(query);
    return products;
  } catch (error: any) {
    throw new Error(error);
  }
};

// Get product details
export const getProductDetailsService = async (
  query: DocumentDefinition<{ _id: string; user: string }>
) => {
  try {
    const product = await ProductModel.findOne(query);
    return product;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const addNewProductService = async (
  newProduct: DocumentDefinition<IProduct>
) => {
  const { name, details, price, productImages, sizes, user } = newProduct;
  try {
    const product = await ProductModel.create({
      name,
      user,
      details,
      price,
      productImages,
      sizes,
      SKU: uuid(),
    });
    const quantity = await QuantityModel.create({
      productId: product._id,
      quantity: newProduct.quantity,
    });

    const updatedWithQuantity = await ProductModel.findByIdAndUpdate(
      product._id,
      { quantity: quantity._id },
      { new: true }
    );
    return updatedWithQuantity;
  } catch (error: any) {
    throw new Error(error);
  }
};

// Update Product
export const updateProductService = async (
  query: DocumentDefinition<{ _id: string }>,
  update: UpdateQuery<ProductDocument>,
  options: QueryOptions
) => {
  try {
    if (update.quantity) {
      await QuantityModel.findOneAndUpdate(
        { productId: query._id },
        { quantity: update.quantity },
        { new: true }
      );
    }
    delete update.quantity; // Remove quantity key, because our quantity reside in another collection and we already updated that
    return await ProductModel.findOneAndUpdate(query, update, options);
  } catch (error: any) {
    throw new Error(error);
  }
};

// delete Product
export const deleteProductService = async (
  query: DocumentDefinition<{ _id: string; user: string }>
) => {
  try {
    const deletedProduct = await ProductModel.deleteOne(query);
    await QuantityModel.deleteOne({ productId: query._id });
    return deletedProduct;
  } catch (error: any) {
    throw new Error(error);
  }
};
