'use client';

import { SubscriptionFlowDataType } from '__flows/subscription/subscriptionQuestionsSchema';
import { CreateStripeCheckoutSessionDataType } from 'lib/custom-api/customApi';
import { buildGetCompatibleProductsBody } from './Product';

export const buildStripeCheckoutBody = async (
  productId: number,
  answers: SubscriptionFlowDataType,
  valuableVariants: (keyof SubscriptionFlowDataType)[],
  valuableAnswers: (keyof SubscriptionFlowDataType)[]
): Promise<CreateStripeCheckoutSessionDataType> => {
  const compatibleProduct = await buildGetCompatibleProductsBody(
    answers,
    valuableVariants,
    valuableAnswers
  );

  const body: CreateStripeCheckoutSessionDataType = {
    product_id: productId,
    ...compatibleProduct,
    note: answers.notes || ''
  };

  console.log('body', JSON.stringify(body, null, 2));
  return body;
};
