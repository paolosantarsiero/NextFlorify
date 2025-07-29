'use client';

import ProductCardsCarouselItem from '@/components/CarouselItems/ProductCardsCarouselItem/ProductCardsCarouselItem';
import { Carousel, CarouselApi, CarouselContent } from '@/components/ui/carousel';
import { useProducts } from '__hooks/Product';
import { useState } from 'react';
import TopSection from './topSection/TopSection';

export default function HomePage() {
  const { products, isProductsLoading, isProductsError, refetchProducts } = useProducts();
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

  return (
    <div className="w-full h-dvh flex items-center justify-center">
      <Carousel
        opts={{
          watchDrag: true,
          containScroll: 'trimSnaps',
          align: 'start'
        }}
        orientation="vertical"
        className="w-full h-dvh"
        setApi={setCarouselApi}
      >
        <CarouselContent className="-mt-1 h-dvh">
          <TopSection carouselApi={carouselApi} />
          <ProductCardsCarouselItem
            title="Le nostre composizioni"
            shouldPrev
            products={products}
            isLoading={isProductsLoading}
            isError={isProductsError}
            carouselApi={carouselApi}
          />
        </CarouselContent>
      </Carousel>
    </div>
  );
}
