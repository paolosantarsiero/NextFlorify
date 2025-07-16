'use client';

import { SubscriptionFlowDataType } from '__flows/subscription/subscriptionQuestionsSchema';
import { CreateStripeCheckoutSessionDataType } from 'lib/custom-api/customApi';

export const buildStripeCheckoutBody = async (
  productId: number,
  answers: SubscriptionFlowDataType,
  valuableAnswers: (keyof SubscriptionFlowDataType)[]
): Promise<CreateStripeCheckoutSessionDataType> => {
  const subscriptionType = answers.path === 'myself' ? answers.preference : 'anniversary';

  const variants = valuableAnswers.reduce(
    (acc, answer) => {
      if (answers[answer]) {
        acc.push({
          slug: answer,
          value: answers[answer].toString()
        });
      }
      return acc;
    },
    [] as { slug: string; value: any }[]
  );

  const notes = Object.keys(answers)
    .filter((key) => !valuableAnswers.includes(key as keyof SubscriptionFlowDataType))
    .map((key) => {
      const value = answers[key as keyof SubscriptionFlowDataType];
      return value ? `${key}: ${value}` : null;
    })
    .filter(Boolean)
    .join(', ');

  const body: CreateStripeCheckoutSessionDataType = {
    subscription_type: subscriptionType,
    product_id: productId,
    quantity: 1,
    variants: variants,
    selected_days: [],
    note: notes ?? ''
  };

  return body;
};
