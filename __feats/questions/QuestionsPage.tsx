'use client';

import { SubscriptionFlowDataType } from '__flows/subscription/subscriptionQuestionsSchema';
import { useStripeCheckoutSession } from '__hooks/stripe';
import { FlowContainer } from 'components/flowContainer/FlowContainer';
import FlowersFooter from 'components/layout/FlowersFooter/FlowersFooter';
import { useState } from 'react';
import { CompatibleProducts } from './CompatibleProducts/CompatibleProducts';

const mockData = {
  customer_id: 1,
  customer_email: 'user@example.com',
  changeEveryTime: false,
  product: {
    product_id: 539,
    quantity: 1
  },
  variants: [
    {
      slug: 'size',
      value: 'small'
    },
    {
      slug: 'packaging',
      value: 'foliage'
    },
    {
      slug: 'frequency',
      value: 'weekly'
    }
  ],
  selected_days: [],
  note: 'string'
};

export default function QuestionsPage() {
  const [ended, setEnded] = useState(false);

  const handleSubmit = (data: SubscriptionFlowDataType) => {
    setEnded(true);
  };

  const { createStripeCheckoutSession } = useStripeCheckoutSession();

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {ended && <CompatibleProducts flowName="subscription" />}

      {!ended && (
        <FlowContainer<SubscriptionFlowDataType> flowName="subscription" onEnd={handleSubmit} />
      )}
      <FlowersFooter state="static" />
      <button
        className="z-50"
        onClick={() =>
          createStripeCheckoutSession({
            ...mockData
          })
        }
      >
        Create Checkout Session
      </button>
    </div>
  );
}
