'use client';

import { SubscriptionFlowDataType } from '__flows/subscription/subscriptionQuestionsSchema';
import { CreateStripeCheckoutSessionDataType } from 'lib/custom-api/customApi';

export const buildStripeCheckoutBody = async (
  productId: number,
  answers: SubscriptionFlowDataType,
  valuableAnswers: (keyof SubscriptionFlowDataType)[]
): Promise<CreateStripeCheckoutSessionDataType> => {
  const subscriptionType = answers.path === 'other' ? 'anniversary' : answers.preference;
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

  const answersSummary = Object.keys(answers)
    .filter((key) => !valuableAnswers.includes(key as keyof SubscriptionFlowDataType))
    .map((key) => {
      const value = answers[key as keyof SubscriptionFlowDataType];
      if (value) {
        return {
          slug: key,
          value: [value]
        };
      }

      return undefined;
    })
    .filter(Boolean) as { slug: string; value: string[] }[];

  //@todo: remove mock data
  if (answers.path === 'other') {
    answersSummary.push({
      slug: 'primary_color',
      value: ['pink', 'red']
    });
    answersSummary.push({
      slug: 'style',
      value: ['classic', 'romantic']
    });
    answersSummary.push({
      slug: 'perfume',
      value: ['light']
    });
  }

  const body: CreateStripeCheckoutSessionDataType = {
    subscription_type: subscriptionType,
    product_id: productId,
    quantity: 1,
    variants: variants,
    answers: answersSummary,
    selected_days: [],
    anniversary_date: answers.specificDay,
    note: answers.notes || ''
  };

  return body;
};
