'use client';

import { useCssAnimationStore } from '@/__store/cssAnimationsStore';
import { flowerAnimation, FlowerAnimationStates } from '@/__types/animations/flower';
import ProductCardsCarouselItem from '@/components/CarouselItems/ProductCardsCarouselItem/ProductCardsCarouselItem';
import { Carousel, CarouselApi, CarouselContent } from '@/components/ui/carousel';
import { useProducts } from '__hooks/Product';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import TopSection from './topSection/TopSection';

export default function HomePage() {
  const { products, isProductsLoading, isProductsError, refetchProducts } = useProducts();
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const { setComponentState } = useCssAnimationStore();
  const { data: session } = useSession();

  useEffect(() => {
    // Check if the session is expired
    const expiresAt = new Date(session?.expires || 0);
    if (expiresAt < new Date()) {
      signOut({ redirect: false });
    }
  }, [session]);

  useEffect(() => {
    if (carouselApi) {
      carouselApi.on('select', () => {
        if (carouselApi.selectedScrollSnap() === 1) {
          setComponentState(flowerAnimation.key, FlowerAnimationStates.HIDDEN);
        } else {
          setComponentState(flowerAnimation.key, FlowerAnimationStates.LOADING_STATIC);
        }
      });
    }
  }, [carouselApi]);

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
            containerCarouselApi={carouselApi}
          />
        </CarouselContent>
      </Carousel>
    </div>
  );
}
