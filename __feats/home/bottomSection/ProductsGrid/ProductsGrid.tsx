import { useScrollListener } from '__hooks/ScrollListener';
import { Product } from 'lib/woocomerce/models/product';
import { useRef } from 'react';
import CompositionCard from './CompositionsCard/CompositionCard';

type Props = {
  products: Product[];
  handleScrollToTop: () => void;
};

export default function ProductsGrid({ products, handleScrollToTop }: Props) {
  const productsGridRef = useRef<HTMLDivElement | null>(null);

  useScrollListener(productsGridRef, {
    onWheel: (event, scrollTop) => {
      if (event.deltaY < 0 && scrollTop === 0) {
        handleScrollToTop();
      }
    },
    stopWheelPropagation: true,
    stopScrollPropagation: true
  });

  return (
    <div
      ref={productsGridRef}
      className="grid grid-cols-3 gap-4 flex-1 overflow-y-auto scrollbar-hide "
    >
      {products?.map((product) => <CompositionCard key={product.id} product={product} />)}
      {products && products.length > 6 && <div className="h-32 col-span-3" />}
    </div>
  );
}
