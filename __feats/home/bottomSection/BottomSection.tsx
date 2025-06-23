import { Button } from '@/components/ui/button';
import { ArrowUpIcon } from '@heroicons/react/24/outline';
import { useProducts } from '__hooks/Product';
import { useScrollListener } from '__hooks/ScrollListener';
import ErrorDataScreen from 'components/DataFetching/ErrorDataScreen';
import LoadingDataScreen from 'components/DataFetching/LoadingDataScreen';
import ProductsGrid from './ProductsGrid/ProductsGrid';

type Props = {
  topSectionRef: React.RefObject<HTMLDivElement | null>;
  bottomSectionRef: React.RefObject<HTMLDivElement | null>;
};

export default function BottomSection({ topSectionRef, bottomSectionRef }: Props) {
  const { products, isProductsLoading, isProductsError, refetchProducts } = useProducts();

  useScrollListener(bottomSectionRef, {
    onWheel: (event) => {
      if (event.deltaY < 0) {
        handleScrollToTop();
      }
    }
  });

  const containerRender = () => {
    if (isProductsLoading) {
      return <LoadingDataScreen />;
    }

    if (isProductsError || !products) {
      return <ErrorDataScreen />;
    }

    return <ProductsGrid products={products} handleScrollToTop={handleScrollToTop} />;
  };

  const handleScrollToTop = () => {
    const container = bottomSectionRef.current;
    if (container) {
      topSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={bottomSectionRef}
      className="flex flex-col h-screen w-full items-center justify-center"
    >
      <div className="flex flex-col w-2/3 h-full pt-60">
        <div className="flex flex-row items-center justify-between mb-4">
          <p className="text-2xl font-bold">Le nostre composizioni</p>
          <Button className="rounded-full p-2" variant="ghost" onClick={handleScrollToTop}>
            <ArrowUpIcon strokeWidth={3} className="h-6 w-6" />
          </Button>
        </div>
        {containerRender()}
      </div>
    </div>
  );
}
