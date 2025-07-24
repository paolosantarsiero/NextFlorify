import { Button } from '@/components/ui/button';
import { CarouselApi, CarouselItem } from '@/components/ui/carousel';
import { ArrowUpIcon } from '@heroicons/react/24/outline';
import ErrorDataScreen from 'components/DataFetching/ErrorDataScreen';
import LoadingDataScreen from 'components/DataFetching/LoadingDataScreen';
import { Product } from 'lib/woocomerce/models/product';
import ProductsGrid from './ProductsGrid/ProductsGrid';

type Props = {
  shouldNext?: boolean;
  shouldPrev?: boolean;
  title: string;
  products?: Product[];
  isLoading: boolean;
  isError: boolean;
  carouselApi: CarouselApi | null;
};

export default function ProductCardsCarouselItem({
  shouldNext,
  shouldPrev,
  title,
  products,
  isLoading,
  isError,
  carouselApi
}: Props) {
  return (
    <CarouselItem
      onWheel={(e) => {
        e.stopPropagation();
        if (e.deltaY < 0) {
          carouselApi?.scrollPrev();
        }
      }}
    >
      <div className="flex justify-center h-dvh w-full">
        <div className="flex flex-col w-full h-dvh pt-31 px-0 sm:px-10 md:pt-40 max-w-236 items-center">
          <div className="flex flex-row items-center justify-between mb-4 w-full px-10 sm:px-0">
            <p className="text-2xl font-bold">{title}</p>
            {shouldPrev && (
              <Button
                className="rounded-full p-2"
                variant="ghost"
                onClick={() => {
                  carouselApi?.scrollPrev();
                }}
              >
                <ArrowUpIcon strokeWidth={3} className="h-6 w-6" />
              </Button>
            )}
            {shouldNext && (
              <Button
                className="rounded-full p-2"
                variant="ghost"
                onClick={() => {
                  carouselApi?.scrollNext();
                }}
              >
                <ArrowUpIcon strokeWidth={3} className="h-6 w-6" />
              </Button>
            )}
          </div>
          {isLoading ? (
            <LoadingDataScreen />
          ) : isError || !products ? (
            <ErrorDataScreen />
          ) : (
            <ProductsGrid products={products} carouselApi={carouselApi} />
          )}
        </div>
      </div>
    </CarouselItem>
  );
}
