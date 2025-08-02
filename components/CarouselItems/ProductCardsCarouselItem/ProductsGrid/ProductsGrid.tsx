import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { useNativeEvent } from '__hooks/nativeEvent';
import { Product } from 'lib/woocomerce/models/product';
import { useRef } from 'react';
import ProductCard from './ProductCard/ProductCard';

export type Props = {
  products: Product[];
  containerCarouselApi?: CarouselApi | null;
  layout?: 'grid' | 'carousel';
  cardType?: 'image' | 'description';
};

export default function ProductsGrid({
  products,
  containerCarouselApi,
  layout = 'grid',
  cardType = 'description'
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useNativeEvent(
    containerRef,
    'wheel',
    (e: Event) => {
      console.log('wheel');
      e.stopPropagation();
      containerCarouselApi?.reInit({
        watchDrag: false,
        containScroll: 'trimSnaps',
        align: 'start'
      });
      setTimeout(() => {
        containerCarouselApi?.reInit({
          watchDrag: true,
          containScroll: 'trimSnaps',
          align: 'start'
        });
      }, 50);
    },
    { passive: false }
  );

  useNativeEvent(
    containerRef,
    'touchstart',
    (e: Event) => {
      console.log('touchstart');
      e.stopPropagation();
      containerCarouselApi?.reInit({
        watchDrag: false
      });
    },
    { passive: false }
  );

  useNativeEvent(
    containerRef,
    'touchcancel',
    (e: Event) => {
      console.log('touchcancel');
      e.stopPropagation();
      containerCarouselApi?.reInit({
        watchDrag: true,
        containScroll: 'trimSnaps',
        align: 'start'
      });
    },
    { passive: false }
  );

  useNativeEvent(
    containerRef,
    'touchend',
    (e: Event) => {
      console.log('touchend');
      e.stopPropagation();
      containerCarouselApi?.reInit({
        watchDrag: true,
        containScroll: 'trimSnaps',
        align: 'start'
      });
    },
    { passive: false }
  );

  return (
    <>
      {layout === 'grid' && (
        <div
          ref={containerRef}
          className="hidden w-full grid-cols-1 px-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:grid-rows-[max-content_max-content_max-content_max-content] lg:grid-rows-[max-content_max-content_max-content] items-start gap-8 flex-1 overflow-x-visible overflow-y-scroll scrollbar-hide z-50"
        >
          {products?.map((product, index) => {
            return <ProductCard key={product.id} product={product} />;
          })}
          <div className="h-32 col-span-1 md:col-span-2 lg:col-span-3" />
        </div>
      )}
      {layout === 'carousel' && (
        <Carousel className="w-full overflow-visible hidden sm:block">
          <CarouselContent className="pl-[15%]">
            {products?.map((product) => (
              <CarouselItem key={product.id} className="basis-[300px] p-2">
                <div className="flex items-center justify-center">
                  <ProductCard product={product} cardType={cardType} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-12" />
          <CarouselNext className="-right-12" />
        </Carousel>
      )}
      <Carousel className="w-full overflow-visible sm:hidden">
        <CarouselContent className="pl-[15%]">
          {products?.map((product) => (
            <CarouselItem key={product.id} className="basis-[85%]">
              <div className="flex p-2 items-center justify-center">
                <ProductCard product={product} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious className="-left-2" /> */}
        {/* <CarouselNext className="-right-2" /> */}
      </Carousel>
    </>
  );
}
