'use client';

import { SubscriptionFlowDataType } from '__flows/subscription/subscriptionQuestionsSchema';
import { CreateStripeCheckoutSessionData } from 'lib/custom-api/customApi';
import { Session } from 'next-auth';

export const buildStripeCheckoutBody = async (
  productId: number,
  answers: SubscriptionFlowDataType,
  valuableAnswers: (keyof SubscriptionFlowDataType)[],
  session: Session | null
): Promise<CreateStripeCheckoutSessionData> => {
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

  const body: CreateStripeCheckoutSessionData = {
    customer_id: session?.user?.store_id ?? 0,
    customer_email: session?.user?.user_email ?? '',
    changeEveryTime: productId === 540, //@todo: this is a temporary solution, should be based on product data
    product: {
      product_id: productId,
      quantity: 1
    },
    variants: variants,
    selected_days: [],
    note: answers.notes ?? ''
  };

  return body;
};
