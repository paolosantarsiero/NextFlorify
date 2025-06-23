import { Product } from '__types/Product';

export const getProducts = async (): Promise<Product[]> => {
  console.log('getProducts');
  return fetch(`/api/products`).then((res) => res.json());
};
