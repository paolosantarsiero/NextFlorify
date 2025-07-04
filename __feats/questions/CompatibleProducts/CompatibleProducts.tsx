import { SubscriptionFlowDataType } from '__flows/subscription/subscriptionQuestionsSchema';
import { useCompatibleProducts } from '__hooks/Product';
import { FlowInstances, useFlowsStore } from '__store/flowsStore';
import LoadingDataScreen from 'components/DataFetching/LoadingDataScreen';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CompatibleProductCard } from './ProductCard/ProductCard';

type Props = {
  flowName: keyof FlowInstances;
};

export const CompatibleProducts = ({ flowName }: Props) => {
  const { getData, reset } = useFlowsStore();
  const [selectedProduct, setSelectedProduct] = useState(0);
  const router = useRouter();

  const { compatibleProducts, isCompatibleProductsLoading, isCompatibleProductsError } =
    useCompatibleProducts(getData(flowName));

  return (
    <div className="flex w-full items-center justify-center">
      {isCompatibleProductsLoading && <LoadingDataScreen />}
      {compatibleProducts &&
        compatibleProducts.isSingleProduct &&
        compatibleProducts.products[selectedProduct] && (
          <CompatibleProductCard
            flowName={flowName}
            answers={getData(flowName) as SubscriptionFlowDataType}
            product={compatibleProducts?.products[selectedProduct]}
            onRemove={() => {
              reset(flowName);
              router.push('/');
            }}
            onNoThanks={() => {
              reset(flowName);
              router.push('/');
            }}
          />
        )}
    </div>
  );
};
