'use server';

import { buildGetCompatibleProductsBody } from '@/__utils/Product';
import { woocommerce } from '@/lib/woocomerce/woocommerce';
import { SubscriptionFlowDataType } from '__flows/subscription/subscriptionQuestionsSchema';
import { productsValuableAnswers } from '__types/product';
import { Product } from 'lib/woocomerce/models/product';

export const getProducts = async (): Promise<Product[]> => {
  const products = await woocommerce.get('products', { author: 1, category_slug: 'anniversary' });
  return products;
};

export type getCompatibleProductsBody = {
  subscription_type?: SubscriptionFlowDataType['preference'];
  variants: {
    slug: string;
    value: string;
  }[];
  answers: any[];
  quantity: number;
};

export const getCompatibleProducts = async (
  answers?: SubscriptionFlowDataType
): Promise<{ products: Product[]; related_products: Product[] }> => {
  if (!answers) {
    throw new Error('Answers are required');
  }
  const subscriptionType = answers.path === 'other' ? 'anniversary' : answers.preference;
  const body = await buildGetCompatibleProductsBody(
    answers,
    productsValuableAnswers[subscriptionType]?.valuableVariants,
    productsValuableAnswers[subscriptionType]?.valuableAnswers
  );
  const response = await woocommerce.post('product-subscription', body);
  console.log(response);
  return response;
};
