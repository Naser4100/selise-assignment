interface IProductList {
  productId: string;
  quantity: string;
  totalPrice: string;
  size: string;
}

export interface AddNewOrderInput {
  productList: Array<IProductList>;
  name: string;
  email: string;
  phone: string;
}
