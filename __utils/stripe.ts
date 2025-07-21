'use client';

import { SubscriptionFlowDataType } from '__flows/subscription/subscriptionQuestionsSchema';
import { CreateStripeCheckoutSessionDataType } from 'lib/custom-api/customApi';

export const buildStripeCheckoutBody = async (
  productId: number,
  answers: SubscriptionFlowDataType,
  valuableVariants: (keyof SubscriptionFlowDataType)[],
  valuableAnswers: (keyof SubscriptionFlowDataType)[]
): Promise<CreateStripeCheckoutSessionDataType> => {
  const subscriptionType = answers.path === 'other' ? 'anniversary' : answers.preference;
  const variants = valuableVariants.reduce(
    (acc, variant) => {
      if (answers[variant]) {
        acc.push({
          slug: variant,
          value: answers[variant].toString()
        });
      }
      return acc;
    },
    [] as { slug: string; value: any }[]
  );

  const answersSummary = valuableAnswers.reduce(
    (acc, variant) => {
      if (answers[variant]) {
        acc.push({
          slug: variant,
          value: [answers[variant].toString()]
        });
      }
      return acc;
    },
    [] as { slug: string; value: any }[]
  );

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

  return body;
};
