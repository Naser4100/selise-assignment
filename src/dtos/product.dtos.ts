import { IProduct } from '../interfaces/product.interface';

export interface UpdateProductInput {
  productId: string;
  updatedInfo: IProduct;
}

export interface GetAllProductInput {
  page: number;
  total: number;
  sortBy: string;
  sortType: string;
}
