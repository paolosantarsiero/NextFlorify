'use server';

import { buildGetCompatibleProductsBody } from '@/__utils/Product';
import { getProductsBySubscriptionType } from '@/lib/custom-api/customApi';
import { woocommerce } from '@/lib/woocomerce/woocommerce';
import { SubscriptionFlowDataType } from '__flows/subscription/subscriptionQuestionsSchema';
import { GetCompatibleProductsResponse, productsValuableAnswers } from '__types/product';
import { getProductAttributes, Product } from 'lib/woocomerce/models/product';

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
): Promise<GetCompatibleProductsResponse | null> => {
  if (!answers) {
    throw new Error('Answers are required');
  }
  const subscriptionType = answers.path === 'other' ? 'anniversary' : answers.preference;
  try {
    const body = await buildGetCompatibleProductsBody(
      answers,
      productsValuableAnswers[subscriptionType]?.valuableVariants,
      productsValuableAnswers[subscriptionType]?.valuableAnswers
    );
    console.log('body', JSON.stringify(body, null, 2));
    const response = await getProductsBySubscriptionType(body);
    // Sort related products by product month
    response.related_products.sort((a, b) => {
      const aMonth = getProductAttributes(a, 'pa_product_month')?.[0] || '';
      const bMonth = getProductAttributes(b, 'pa_product_month')?.[0] || '';
      return aMonth.localeCompare(bMonth);
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
