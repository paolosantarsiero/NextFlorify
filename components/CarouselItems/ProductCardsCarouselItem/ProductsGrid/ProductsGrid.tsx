import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { useNativeEvent } from '__hooks/nativeEvent';
import { Product } from 'lib/woocomerce/models/product';
import { useRef } from 'react';
import ProductCard from './ProductCard/ProductCard';

type Props = {
  products: Product[];
  carouselApi?: CarouselApi | null;
};

export default function ProductsGrid({ products, carouselApi }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useNativeEvent(
    containerRef,
    'wheel',
    (e: Event) => {
      console.log('wheel');
      e.stopPropagation();
      carouselApi?.reInit({
        watchDrag: false,
        containScroll: 'trimSnaps',
        align: 'start'
      });
      setTimeout(() => {
        carouselApi?.reInit({
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
      carouselApi?.reInit({
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
      carouselApi?.reInit({
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
      carouselApi?.reInit({
        watchDrag: true,
        containScroll: 'trimSnaps',
        align: 'start'
      });
    },
    { passive: false }
  );

  return (
    <>
      <div
        ref={containerRef}
        className="hidden w-full grid-cols-1 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:grid-rows-[max-content_max-content_max-content_max-content] lg:grid-rows-[max-content_max-content_max-content] items-start gap-8 flex-1 overflow-x-visible overflow-y-scroll scrollbar-hide z-50"
      >
        {products?.map((product, index) => {
          return <ProductCard key={product.id} product={product} />;
        })}
        <div className="h-32 col-span-1 md:col-span-2 lg:col-span-3" />
      </div>
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
