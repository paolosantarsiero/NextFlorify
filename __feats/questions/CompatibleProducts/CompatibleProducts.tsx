import { useCompatibleProducts } from '__hooks/Product';
import { FlowInstances, useFlowsStore } from '__store/flowsStore';
import LoadingDataScreen from 'components/DataFetching/LoadingDataScreen';
import { ProductCard } from './ProductCard/ProductCard';

type Props = {
  flowName: keyof FlowInstances;
};

export const CompatibleProducts = ({ flowName }: Props) => {
  const { getData } = useFlowsStore();
  const flowData = getData(flowName);

  const { compatibleProducts, isCompatibleProductsLoading, isCompatibleProductsError } =
    useCompatibleProducts(flowData.data);

  return (
    <div className="flex flex-col gap-4">
      {isCompatibleProductsLoading && <LoadingDataScreen />}
      {compatibleProducts && (
        <div className="flex ">
          {compatibleProducts.products?.map((product) => (
            <ProductCard key={product.id!} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
