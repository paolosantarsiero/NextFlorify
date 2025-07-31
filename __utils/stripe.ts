'use client';

import { SubscriptionFlowDataType } from '__flows/subscription/subscriptionQuestionsSchema';
import { CreateStripeCheckoutSessionDataType, Variant } from 'lib/custom-api/customApi';

export const buildStripeCheckoutBody = async (
  productId: number,
  answers: SubscriptionFlowDataType,
  valuableVariants: (keyof SubscriptionFlowDataType)[],
  valuableAnswers: (keyof SubscriptionFlowDataType)[]
): Promise<CreateStripeCheckoutSessionDataType> => {
  console.log('answers', JSON.stringify(answers, null, 2));
  const subscriptionType = answers.path === 'other' ? 'anniversary' : answers.preference;
  const variants: Variant[] = valuableVariants.reduce((acc, variant) => {
    if (answers[variant]) {
      const value = Array.isArray(answers[variant])
        ? answers[variant].length === 1
          ? answers[variant][0]
          : answers[variant]
        : answers[variant].toString();
      acc.push({
        slug: variant,
        value: value
      });
    }
    return acc;
  }, [] as Variant[]);

  const answersSummary: Variant[] = valuableAnswers.reduce((acc, variant) => {
    if (answers[variant]) {
      const value = Array.isArray(answers[variant])
        ? answers[variant].length === 1
          ? answers[variant][0]
          : answers[variant]
        : answers[variant].toString();
      acc.push({
        slug: variant,
        value: value
      });
    }
    return acc;
  }, [] as Variant[]);

  const body: CreateStripeCheckoutSessionDataType = {
    subscription_type: subscriptionType,
    product_id: productId,
    quantity: 1,
    variants: variants,
    answers: answersSummary,
    selected_days: answers.selected_days || [],
    anniversary_date: answers.anniversary_date,
    note: answers.notes || ''
  };

  console.log('body', JSON.stringify(body, null, 2));
  return body;
};
