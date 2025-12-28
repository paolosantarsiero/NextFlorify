import { SubscriptionFlowDataType } from '@/__flows/subscription/subscriptionQuestionsSchema';
import { Answer, Variant } from '@/lib/custom-api/customApi';
import { Product } from 'lib/woocomerce/models/product';
import Stripe from 'stripe';

export type getCompatibleProductsBody = {
  subscription_type: SubscriptionFlowDataType['preference'] | 'anniversary';
  variants: Variant[];
  answers: Answer[];
  quantity: number;
};

export type productValuableAnswersType = {
  productType: SubscriptionFlowDataType['preference'] | 'anniversary';
  valuableVariants: (keyof SubscriptionFlowDataType)[];
  valuableAnswers: (keyof SubscriptionFlowDataType)[];
};

export const productsValuableAnswers: Record<
  productValuableAnswersType['productType'],
  productValuableAnswersType
> = {
  flower: {
    productType: 'flower',
    valuableVariants: ['size', 'frequency', 'packaging'],
    valuableAnswers: ['primary_color', 'selected_days']
  },
  plant: {
    productType: 'plant',
    valuableVariants: ['vase'],
    valuableAnswers: ['surprise', 'selected_days']
  },
  anniversary: {
    productType: 'anniversary',
    valuableVariants: ['size'],
    valuableAnswers: [
      'for',
      'anniversaries',
      'anniversary_date',
      'primary_color',
      'style',
      'perfume',
      'anniversary_date'
    ]
  }
};

export type GetCompatibleProductsResponse = {
  products: Product[];
  related_products: Product[];
  delivery_date?: string;
  subscription?: Stripe.Product;
  price?: Stripe.Price;
};
