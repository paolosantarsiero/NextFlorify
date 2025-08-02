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
    note: answers.notes || '',
    customer_lat: answers.coordinates?.latitude,
    customer_lng: answers.coordinates?.longitude
  };

  return body;
};
