interface ProductId {
  name: string;
  price: number;
  details: string;
  sizes: Array<string>;
  SKU: string;
  productImages: Array<string>;
  quantity: object;
}

export default interface IClientOrderDetails {
  _id?: string;
  productId: ProductId;
  quantity: number;
  totalPrice: number;
  size: string;
}
