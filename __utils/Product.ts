'use server';

import { SubscriptionFlowDataType } from '__flows/subscription/subscriptionQuestionsSchema';
import { getCompatibleProductsBody } from '__types/product';

export const buildGetCompatibleProductsBody = async (
  answers: SubscriptionFlowDataType,
  valuableAnswers: (keyof SubscriptionFlowDataType)[]
): Promise<getCompatibleProductsBody> => {
  let subscriptionType: getCompatibleProductsBody['subscription_type'] =
    answers.path === 'myself' ? answers.preference : 'anniversary';
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

  const body: getCompatibleProductsBody = {
    subscription_type: subscriptionType,
    variants: variants,
    answers: [],
    quantity: 1
  };

  return body;
};
