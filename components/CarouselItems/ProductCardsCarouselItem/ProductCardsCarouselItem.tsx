import { Button } from '@/components/ui/button';
import { CarouselApi, CarouselItem } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { ArrowUpIcon } from '@heroicons/react/24/outline';
import ErrorDataScreen from 'components/DataFetching/ErrorDataScreen';
import LoadingDataScreen from 'components/DataFetching/LoadingDataScreen';
import { Product } from 'lib/woocomerce/models/product';
import { useTranslations } from 'next-intl';
import ProductsGrid, { Props as ProductsGridProps } from './ProductsGrid/ProductsGrid';

type Props = {
  shouldNext?: boolean;
  shouldPrev?: boolean;
  title: string;
  products?: Partial<Product>[];
  isLoading: boolean;
  isError: boolean;
  containerCarouselApi: CarouselApi | null;
  onBuy?: () => void;
} & Partial<ProductsGridProps>;

export default function ProductCardsCarouselItem({
  shouldNext,
  shouldPrev,
  title,
  products,
  isLoading,
  isError,
  containerCarouselApi,
  layout,
  cardType,
  onBuy
}: Props) {
  const tShared = useTranslations('shared');
  return (
    <CarouselItem
      onWheel={(e) => {
        e.stopPropagation();
        if (e.deltaY < 0) {
          containerCarouselApi?.scrollPrev();
        }
      }}
    >
      <div className="flex justify-center h-dvh w-full">
        <div
          className={cn(
            'flex flex-col w-full h-dvh pt-31 px-0 md:pt-40 max-w-236 items-center',
            layout === 'carousel' && 'md:pt-31'
          )}
        >
          <div className="flex flex-row items-center justify-between mb-4 w-full px-20 sm:px-10">
            <p className="text-2xl font-bold">{title}</p>
            {shouldPrev && (
              <Button
                className="rounded-full p-2"
                variant="ghost"
                onClick={() => {
                  containerCarouselApi?.scrollPrev();
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
                  containerCarouselApi?.scrollNext();
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
            <ProductsGrid
              products={products}
              containerCarouselApi={containerCarouselApi}
              layout={layout}
              cardType={cardType}
            />
          )}
          {onBuy && (
            <div className="flex flex-col items-end col-span-1 w-full justify-end px-10">
              <p className="text-2xl font-bold">
                {products?.[0]?.price} €{' '}
                <span className="text-[15px] font-normal">{tShared('includedVat')}</span>
              </p>
              <Button variant="gradient" className="" onClick={onBuy}>
                {tShared('buy')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </CarouselItem>
  );
}
