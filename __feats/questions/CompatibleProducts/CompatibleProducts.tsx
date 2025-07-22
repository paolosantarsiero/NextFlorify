import ErrorDataScreen from '@/components/DataFetching/ErrorDataScreen';
import { SubscriptionFlowDataType } from '__flows/subscription/subscriptionQuestionsSchema';
import { useGetCompatibleProducts } from '__hooks/Product';
import { FlowInstances, useFlowsStore } from '__store/flowsStore';
import LoadingDataScreen from 'components/DataFetching/LoadingDataScreen';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { CompatibleProductsCard } from './ProductCard/ProductCard';

type Props = {
  flowName: keyof FlowInstances;
};

export const CompatibleProducts = ({ flowName }: Props) => {
  const { getData, reset } = useFlowsStore();
  const router = useRouter();

  const {
    compatibleProducts,
    isGetCompatibleProductsLoading,
    isGetCompatibleProductsError,
    refetchGetCompatibleProducts
  } = useGetCompatibleProducts(getData(flowName) as SubscriptionFlowDataType);

  useEffect(() => {
    console.log(compatibleProducts);
  }, [refetchGetCompatibleProducts]);

  return (
    <div className="flex w-full items-center gap-3 px-3 overflow-y-auto sm:overflow-x-auto flex-col sm:flex-row sm:gap-6 justify-start">
      {isGetCompatibleProductsLoading && <LoadingDataScreen />}
      {isGetCompatibleProductsError && <ErrorDataScreen />}
      {compatibleProducts && (
        <CompatibleProductsCard
          flowName={flowName}
          answers={getData(flowName) as SubscriptionFlowDataType}
          products={compatibleProducts.products}
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
