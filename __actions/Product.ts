'use server';

import { woocommerce } from '@/lib/woocomerce/woocommerce';
import { SubscriptionFlowDataType } from '__flows/subscription/subscriptionQuestionsSchema';
import { Product } from 'lib/woocomerce/models/product';

export const getProducts = async (): Promise<Product[]> => {
  const products = await woocommerce.get('products', { author: 1, category_slug: 'occasioni' });
  return products;
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
  id: 540,
  name: 'Pianta',
  description: 'Pianta'
};

export const getCompatibleProducts = async (
  answers?: SubscriptionFlowDataType
): Promise<CompatibleProductsResponse> => {
  if (answers?.path === 'myself') {
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
    products: []
  };
};
