import ProductCard from '@/components/CarouselItems/ProductCardsCarouselItem/ProductsGrid/ProductCard/ProductCard';
import Prose from '@/components/prose';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

import { Product } from '@/lib/woocomerce/models/product';
import { CalendarDays, ClockFadingIcon, FlaskRound, Info } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import Stripe from 'stripe';

type Props = {
  carouselApi?: CarouselApi;
  relatedProducts?: Partial<Product>[];
  products?: Partial<Product>[];
  deliveryDate?: string;
  subscription?: Partial<Stripe.Product>;
  onSelect: (index: number) => void;
  selectedIndex: number;
  onBuy: () => void;
};

export const MultiProductCard = ({
  carouselApi,
  relatedProducts,
  products,
  subscription,
  deliveryDate,
  onSelect,
  selectedIndex,
  onBuy
}: Props) => {
  const tProductPage = useTranslations('ProductPage');
  const [productsCarouselApi, setProductsCarouselApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    if (productsCarouselApi) {
      productsCarouselApi.on('select', () => {
        onSelect(productsCarouselApi.selectedScrollSnap());
      });
    }
  }, [productsCarouselApi]);

  return (
    <>
      <div className="w-full sm:w-170 h-44 flex items-end gap-0 py-6">
        <div className="flex flex-row items-center gap-2">
          <FlaskRound className="w-10 h-10" />
          <div className="flex flex-col gap-0">
            <p className="text-2xl font-bold">{tProductPage('chosenForYou')}</p>
            <p className="text-2xl font-bold text-faded-foreground">
              {tProductPage('compatibility')} {products?.[selectedIndex]?.score}%
            </p>
          </div>
        </div>
      </div>
      <Card
        className={cn(
          'w-full rounded-2xl border-none bg-background backdrop-blur-sm',
          'h-107 sm:w-170',
          'flex flex-row justify-between gap-14'
        )}
      >
        {/* SUBSCRIPTION SECTION */}
        <div className={cn('flex flex-col', 'pt-11 px-8 pb-6', 'w-1/2')}>
          <div className="flex flex-col">
            <p className="text-2xl font-bold">{subscription?.name ?? ''}</p>
            <Prose
              html={subscription?.description ?? ''}
              className="text-sm leading-6 h-28 line-clamp-4 "
            />
          </div>
          {/* @TODO: add frequency */}
          <div className="flex flex-col gap-0.5 mt-4">
            <p className="flex items-center gap-2 text-normal font-bold ">
              <CalendarDays className="w-4 h-4" />
              {tProductPage('frequency')}
            </p>
            <p className="text-normal font-normal">Mensile</p>
          </div>
          {/* @TODO: add delivery day */}
          <div className="flex flex-col gap-0.5 mt-4">
            <p className="flex items-center gap-2 text-normal font-bold ">
              <ClockFadingIcon className="w-4 h-4" />
              {tProductPage('nextDelivery')}
            </p>
            <p className="text-normal font-normal">{deliveryDate}</p>
          </div>
        </div>
        <div className={cn('flex ', 'pt-2.5 px-2 pb-5 w-1/2')}>
          <Carousel setApi={setProductsCarouselApi} className="w-full overflow-visible">
            <CarouselContent className="">
              {products?.map((product) => (
                <CarouselItem key={product.id} className="">
                  <div className="flex p-2 items-center justify-center">
                    <ProductCard product={product as Product} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-2" />
            <CarouselNext className="-right-2" />
          </Carousel>
        </div>
      </Card>
      <div className="grid grid-cols-2 sm:grid-cols-3 w-full sm:w-170 pt-2">
        <div className="hidden sm:block sm:col-span-1"></div>
        {relatedProducts && relatedProducts.length > 0 ? (
          <Button
            variant="ghost"
            className="rounded-full col-span-1"
            onClick={() => {
              carouselApi?.scrollNext();
            }}
          >
            <Info />
            {tProductPage('discoverRelatedProducts')}
          </Button>
        ) : (
          <div className="col-span-1"></div>
        )}
        <div className="flex flex-col items-end col-span-1">
          <p className="text-2xl font-bold">
            {products?.[0]?.price}${' '}
            <span className="text-[15px] font-normal">{tProductPage('includedVat')}</span>
          </p>
          <Button variant="gradient" className="w-full" onClick={onBuy}>
            {tProductPage('buy')}
          </Button>
        </div>
      </div>
    </>
  );
};
