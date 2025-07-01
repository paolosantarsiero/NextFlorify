import { SubscriptionFlowDataType } from '__flows/subscription/subscriptionQuestionsSchema';
import { CreateStripeCheckoutSessionData } from 'lib/custom-api/customApi';

export const buildStripeCheckoutBody = async (
  productId: number,
  answers: SubscriptionFlowDataType,
  valuableAnswers: (keyof SubscriptionFlowDataType)[]
): Promise<CreateStripeCheckoutSessionData> => {
  console.log(answers);
  const variants = valuableAnswers.reduce(
    (acc, answer) => {
      if (answers[answer]) {
        acc.push({
          slug: answer,
          value: answers[answer]
        });
      }
      return acc;
    },
    [] as { slug: string; value: any }[]
  );

  const body: CreateStripeCheckoutSessionData = {
    customer_id: 4,
    customer_email: 'user@example.com',
    changeEveryTime: false,
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
