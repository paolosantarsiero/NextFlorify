'use client';

import { Product } from 'lib/woocomerce/models/product';

export const getProducts = async (): Promise<Product[]> => {
  return fetch(`/api/products`).then((res) => res.json());
};

export type CompatibleProductsResponse = {
  isSingleProduct: boolean;
  compatibleProducts: Product[];
};

export const getCompatibleProducts = async (
  answers: any
): Promise<CompatibleProductsResponse[]> => {
  const data = await getProducts();
  return data.map((product) => ({
    isSingleProduct: product.type === 'simple',
    compatibleProducts: data.filter((p: Product) => p.id !== product.id)
  }));
};
