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
    <div>
      {isCompatibleProductsLoading && <LoadingDataScreen />}
      {!compatibleProducts && <div>{JSON.stringify(compatibleProducts)}</div>}
      {compatibleProducts && (
        <div className="flex ">
          {compatibleProducts.map((product) => (
            <ProductCard
              key={product.compatibleProducts[0]?.id}
              product={product.compatibleProducts[0]!}
            />
          ))}
        </div>
      )}
    </div>
  );
};
