import { useStripeCheckoutSession } from '__hooks/stripe';
import { FlowContainer } from 'components/flowContainer/FlowContainer';
import FlowersFooter from 'components/layout/FlowersFooter/FlowersFooter';

const mockData = {
  customer_id: 4,
  customer_email: 'user@demo.it',
  changeEveryTime: false,
  products: [
    {
      product_id: 187,
      quantity: 1
    }
  ],
  line_items: [
    {
      price: 'price_1RLtexPI5EquFB26j3gu3ZKJ',
      quantity: 1
    }
  ],
  note: 'string'
};

export default function QuestionsPage() {
  const { createStripeCheckoutSession, isLoadingStripeCheckoutSession } =
    useStripeCheckoutSession();
  const handleSubmit = (data: any) => {
    createStripeCheckoutSession({
      ...mockData
    });
  };
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <FlowContainer
        flowName="subscription"
        onEnd={handleSubmit}
        isLoading={isLoadingStripeCheckoutSession}
      />
      <FlowersFooter state="static" />
    </div>
  );
}
