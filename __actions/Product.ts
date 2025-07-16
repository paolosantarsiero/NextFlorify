'use server';

import { woocommerce } from '@/lib/woocomerce/woocommerce';
import { SubscriptionFlowDataType } from '__flows/subscription/subscriptionQuestionsSchema';
import { Product } from 'lib/woocomerce/models/product';

export const getProducts = async (): Promise<Product[]> => {
  const products = await woocommerce.get('products', { author: 1, category_slug: 'anniversary' });
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
  const subscriptionType = answers?.preference === 'flower' ? 'flower' : answers?.preference === 'plant' ? 'plant' : answers?.forWhom === 'other' ? 'anniversary' : 'anniversary'
  const productsBySubscription = await woocommerce.post('product-subscription', { subscription_type: subscriptionType, quantity: 1 }) as {products: Product[], related_products: Product[], variants: [], answers: []};
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
