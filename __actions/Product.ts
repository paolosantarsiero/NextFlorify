import { Product } from 'lib/woocomerce/models/product';

export const getProducts = async (): Promise<Product[]> => {
  return fetch(`/api/products`).then((res) => res.json());
};

export const getCompatibleProducts = async (answers: any): Promise<Product[]> => {
  return fetch(`/api/products`).then((res) => res.json());
};
