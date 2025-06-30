'use client';

import { Product } from 'lib/woocomerce/models/product';

export const getProducts = async (): Promise<Product[]> => {
  return fetch(`/api/products`).then((res) => res.json());
};

export type CompatibleProductsResponse = {
  isSingleProduct: boolean;
  products: Partial<Product>[];
};

const pensieroFiorito: Partial<Product> = {
  id: 539,
  name: 'Pensiero Fiorito',
  description: 'Pensiero Fiorito'
};

export const getCompatibleProducts = async (answers: any): Promise<CompatibleProductsResponse> => {
  if (answers.forWhom === 'myself') {
    if (answers.preference === 'flower') {
      return {
        isSingleProduct: true,
        products: [pensieroFiorito]
      };
    }

    return {
      isSingleProduct: true,
      products: []
    };
  }

  const data = await getProducts();
  return {
    isSingleProduct: true,
    products: data
  };
};
