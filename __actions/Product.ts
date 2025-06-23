import { Product } from 'lib/woocomerce/models/product';

export const getProducts = async (): Promise<Product[]> => {
  console.log('getProducts');
  return fetch(`/api/products`).then((res) => res.json());
};
