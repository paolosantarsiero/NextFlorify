import { SubscriptionFlowDataType } from '__flows/subscription/subscriptionQuestionsSchema';
import { useGetCompatibleProducts } from '__hooks/Product';
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

  const { compatibleProducts, isGetCompatibleProductsLoading, isGetCompatibleProductsError } =
    useGetCompatibleProducts(getData(flowName) as SubscriptionFlowDataType);

  return (
    <div className="flex w-full items-center gap-3 px-3 overflow-y-auto sm:overflow-x-auto flex-col sm:flex-row sm:gap-6 justify-start">
      {isGetCompatibleProductsLoading && <LoadingDataScreen />}
      {compatibleProducts &&
        compatibleProducts.products.map((product) => (
          <CompatibleProductCard
            key={product.id}
            flowName={flowName}
            answers={getData(flowName) as SubscriptionFlowDataType}
            product={product}
            onRemove={() => {
              reset(flowName);
              router.push('/');
            }}
            onNoThanks={() => {
              reset(flowName);
              router.push('/');
            }}
          />
        ))}
    </div>
  );
};
