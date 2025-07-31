'use server';

import { Variant } from '@/lib/custom-api/customApi';
import { SubscriptionFlowDataType } from '__flows/subscription/subscriptionQuestionsSchema';
import { getCompatibleProductsBody } from '__types/product';

export const buildGetCompatibleProductsBody = async (
  answers: SubscriptionFlowDataType,
  valuableVariants: (keyof SubscriptionFlowDataType)[],
  valuableAnswers: (keyof SubscriptionFlowDataType)[]
): Promise<getCompatibleProductsBody> => {
  console.log('answers', JSON.stringify(answers, null, 2));
  let subscriptionType: getCompatibleProductsBody['subscription_type'] =
    answers.path === 'other' ? 'anniversary' : answers.preference;
  const variants: Variant[] = (valuableVariants || []).reduce((acc, variant) => {
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

  const answersSummary = (valuableAnswers || []).reduce((acc, answer) => {
    if (answers[answer]) {
      const value = Array.isArray(answers[answer])
        ? answers[answer].length === 1
          ? answers[answer][0]
          : answers[answer]
        : answers[answer].toString();
      acc.push({
        slug: answer,
        value: value
      });
    }
    return acc;
  }, [] as Variant[]);

  const body: getCompatibleProductsBody = {
    subscription_type: subscriptionType,
    variants: variants,
    answers: answersSummary || [],
    quantity: 1
  };

  console.log('body', JSON.stringify(body, null, 2));
  return body;
};
