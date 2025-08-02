'use server';

import { Answer, Variant } from '@/lib/custom-api/customApi';
import { SubscriptionFlowDataType } from '__flows/subscription/subscriptionQuestionsSchema';
import { getCompatibleProductsBody } from '__types/product';

export const buildGetCompatibleProductsBody = async (
  answers: SubscriptionFlowDataType,
  valuableVariants: (keyof SubscriptionFlowDataType)[],
  valuableAnswers: (keyof SubscriptionFlowDataType)[]
): Promise<getCompatibleProductsBody> => {
  let subscriptionType: getCompatibleProductsBody['subscription_type'] =
    answers.path === 'other' ? 'anniversary' : answers.preference;
  const variants: Variant[] = (valuableVariants || []).reduce((acc, variant) => {
    if (answers[variant]) {
      acc.push({
        slug: variant,
        value: answers[variant].toString()
      });
    }
    return acc;
  }, [] as Variant[]);

  const answersSummary = (valuableAnswers || []).reduce((acc, answer) => {
    if (answers[answer]) {
      acc.push({
        slug: answer,
        value: Array.isArray(answers[answer]) ? answers[answer] : [answers[answer].toString()]
      });
    }
    return acc;
  }, [] as Answer[]);

  const body: getCompatibleProductsBody = {
    subscription_type: subscriptionType,
    variants: variants,
    answers: answersSummary || [],
    quantity: 1
  };

  return body;
};
