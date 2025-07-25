import { SubscriptionFlowDataType } from '@/__flows/subscription/subscriptionQuestionsSchema';
import { Product } from 'lib/woocomerce/models/product';
import Stripe from 'stripe';

export type getCompatibleProductsBody = {
  subscription_type?: SubscriptionFlowDataType['preference'] | 'anniversary';
  variants: {
    slug: string;
    value: string;
  }[];
  answers: any[];
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
    valuableAnswers: ['primary_color']
  },
  plant: {
    productType: 'plant',
    valuableVariants: ['vase'],
    valuableAnswers: ['surprise']
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
      'perfume'
    ]
  }
};

export type GetCompatibleProductsResponse = {
  products: Partial<Product>[];
  related_products: Partial<Product>[];
  subscription?: Partial<Stripe.Product>;
};
