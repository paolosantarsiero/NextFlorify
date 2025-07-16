import { SubscriptionFlowDataType } from '@/__flows/subscription/subscriptionQuestionsSchema';

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
  valuableAnswers: (keyof SubscriptionFlowDataType)[];
};

export const productsValuableAnswers: Record<
  productValuableAnswersType['productType'],
  productValuableAnswersType
> = {
  flower: {
    productType: 'flower',
    valuableAnswers: ['size', 'frequency', 'packaging']
  },
  plant: {
    productType: 'plant',
    valuableAnswers: ['vase']
  },
  anniversary: {
    productType: 'anniversary',
    valuableAnswers: ['size']
  }
};
