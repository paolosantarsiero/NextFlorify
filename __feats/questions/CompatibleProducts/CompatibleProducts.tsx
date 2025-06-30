import { useCompatibleProducts } from '__hooks/Product';
import { FlowInstances, useFlowsStore } from '__store/flowsStore';
import LoadingDataScreen from 'components/DataFetching/LoadingDataScreen';
import { useState } from 'react';
import { ProductCard } from './ProductCard/ProductCard';

type Props = {
  flowName: keyof FlowInstances;
};

export const CompatibleProducts = ({ flowName }: Props) => {
  const { getData } = useFlowsStore();
  const flowData = getData(flowName);
  const [selectedProduct, setSelectedProduct] = useState(0);

  const { compatibleProducts, isCompatibleProductsLoading, isCompatibleProductsError } =
    useCompatibleProducts(flowData.data);

  return (
    <div>
      {isCompatibleProductsLoading && <LoadingDataScreen />}
      {compatibleProducts && (
        <div className="flex ">
          {compatibleProducts[selectedProduct] ? (
            <ProductCard product={compatibleProducts[selectedProduct]} />
          ) : (
            <div>No product selected</div>
          )}
        </div>
      )}
    </div>
  );
};
