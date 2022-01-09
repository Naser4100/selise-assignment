export interface IProduct {
  name: string;
  user: string;
  price: number;
  details: string;
  quantity?: string;
  sizes: Array<string>;
  SKU?: string;
  productImages: Array<string>;
}
