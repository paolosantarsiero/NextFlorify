'use server';

import { SubscriptionFlowDataType } from '__flows/subscription/subscriptionQuestionsSchema';
import { getCompatibleProductsBody } from '__types/product';

export const buildGetCompatibleProductsBody = async (
  answers: SubscriptionFlowDataType,
  valuableAnswers: (keyof SubscriptionFlowDataType)[]
): Promise<getCompatibleProductsBody> => {
  let subscriptionType: getCompatibleProductsBody['subscription_type'] =
    answers.path === 'other' ? 'anniversary' : answers.preference;
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
    })
    .filter(Boolean);

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

  const body: getCompatibleProductsBody = {
    subscription_type: subscriptionType,
    variants: variants,
    answers: answersSummary || [],
    quantity: 1
  };

  return body;
};
