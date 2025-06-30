import { useScrollListener } from '__hooks/ScrollListener';
import { Product } from 'lib/woocomerce/models/product';
import { useRef } from 'react';
import ProductCard from './ProductCard/ProductCard';

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
    stopScrollPropagation: true,
    stopTouchPropagation: true,
    preventTouchDefault: true
  });

  return (
    <div
      ref={productsGridRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 overflow-y-auto scrollbar-hide "
    >
      {products?.map((product) => <ProductCard key={product.id} product={product} />)}
      <div className="h-32 col-span-1 md:col-span-2 lg:col-span-3" />
    </div>
  );
}
