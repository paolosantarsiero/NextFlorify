import { SubscriptionFlowDataType } from '__flows/subscription/subscriptionQuestionsSchema';
import { useCompatibleProducts } from '__hooks/Product';
import LoadingDataScreen from 'components/DataFetching/LoadingDataScreen';
import { FlowContainer } from 'components/flowContainer/FlowContainer';
import FlowersFooter from 'components/layout/FlowersFooter/FlowersFooter';
import { useEffect, useState } from 'react';
import { CompatibleProducts } from './CompatibleProducts/CompatibleProducts';

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
  const [ended, setEnded] = useState(false);

  const { isCompatibleProductsLoading, refetchCompatibleProducts } =
    useCompatibleProducts(mockData);

  const handleSubmit = (data: SubscriptionFlowDataType) => {
    setEnded(true);
  };

  useEffect(() => {
    refetchCompatibleProducts();
  }, [refetchCompatibleProducts]);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {isCompatibleProductsLoading && <LoadingDataScreen />}

      {ended && <CompatibleProducts flowName="subscription" />}

      {!ended && (
        <FlowContainer<SubscriptionFlowDataType> flowName="subscription" onEnd={handleSubmit} />
      )}
      <FlowersFooter state="static" />
    </div>
  );
}
