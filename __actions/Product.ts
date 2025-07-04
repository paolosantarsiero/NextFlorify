'use client';

import { SubscriptionFlowDataType } from '__flows/subscription/subscriptionQuestionsSchema';
import { Product } from 'lib/woocomerce/models/product';

export const getProducts = async (): Promise<Product[]> => {
  return fetch(`/api/products`).then((res) => res.json());
};

export type CompatibleProductsResponse = {
  isSingleProduct: boolean;
  products: CompatibleProduct[];
};

export type CompatibleProduct = {
  product: Partial<Product>;
  valuableAnswers: (keyof SubscriptionFlowDataType)[];
};

const pensieroFiorito: Partial<Product> = {
  id: 539,
  name: 'Pensiero Fiorito',
  description: 'Pensiero Fiorito'
};

const pianta: Partial<Product> = {
  id: 539,
  name: 'Pianta',
  description: 'Pianta'
};

export const getCompatibleProducts = async (
  answers?: SubscriptionFlowDataType
): Promise<CompatibleProductsResponse> => {
  console.log('answers', answers);
  if (answers?.path === 'myself') {
    console.log('subscription');
    if (answers?.preference === 'flower') {
      return {
        isSingleProduct: true,
        products: [
          { product: pensieroFiorito, valuableAnswers: ['size', 'frequency', 'packaging'] }
        ]
      };
    }
    if (answers?.preference === 'plant') {
      console.log('plant');
      return {
        isSingleProduct: true,
        products: [{ product: pianta, valuableAnswers: ['vase'] }]
      };
    }

    return {
      isSingleProduct: true,
      products: [{ product: pensieroFiorito, valuableAnswers: ['size', 'frequency', 'packaging'] }]
    };
  }

  console.log('else');
  return {
    isSingleProduct: true,
    products: [{ product: pianta, valuableAnswers: ['vase'] }]
  };
};
