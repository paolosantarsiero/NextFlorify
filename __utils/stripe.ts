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

  console.log('Stripe Checkout Body:', JSON.stringify(answers, null, 2));

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
    selected_days: answers.selected_days || [],
    anniversary_date: answers.specificDay,
    note: answers.notes || ''
  };
  console.log('Stripe Checkout Body:', JSON.stringify(body, null, 2));

  return body;
};
