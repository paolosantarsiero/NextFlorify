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
    valuableAnswers: ['color']
  },
  plant: {
    productType: 'plant',
    valuableVariants: ['vase'],
    valuableAnswers: []
  },
  anniversary: {
    productType: 'anniversary',
    valuableVariants: ['size'],
    valuableAnswers: ['for', 'anniversaries', 'specificDay', 'color']
  }
};
