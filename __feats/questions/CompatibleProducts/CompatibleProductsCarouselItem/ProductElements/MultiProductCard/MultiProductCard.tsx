import Floro from '@/components/rive/floro';
import { Card } from '@/components/ui/card';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Product } from '@/lib/woocomerce/models/product';
import { CalendarDaysIcon, Clock10, Gift } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import Stripe from 'stripe';
import striptags from 'striptags';
import SelectProductCard from './SelectCarousel/SelectProductCard';

type Props = {
  containerCarouselApi?: CarouselApi;
  relatedProducts?: Partial<Product>[];
  products?: Partial<Product>[];
  deliveryDate?: string;
  subscription?: Partial<Stripe.Product>;
  onSelect: (index: number) => void;
  selectedIndex: number;
  onBuy: () => void;
};

export const MultiProductCard = ({
  containerCarouselApi,
  relatedProducts,
  products,
  subscription,
  deliveryDate,
  onSelect,
  selectedIndex,
  onBuy
}: Props) => {
  const tProductPage = useTranslations('ProductPage');
  const tShared = useTranslations('shared');
  const [productsCarouselApi, setProductsCarouselApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    if (productsCarouselApi) {
      productsCarouselApi.on('select', () => {
        onSelect(productsCarouselApi.selectedScrollSnap());
      });
    }
  }, [productsCarouselApi]);

  return (
    <div className="flex flex-col w-full justify-center items-center px-4 relative">
      <div className="flex flex-col items-center gap-2">
        <div className="w-67 translate-y-4 z-10">
          <Floro
            state="idle"
            flowName="subscription"
            navigation={false}
            className="h-30 translate-y-5 z-0"
          />
          <div className="z-10 h-14 p-6-mt-[24px] hover:scale-110 transition-transform duration-300 ease-in-out text-center items-center justify-center flex shadow-[0_4px_13px_rgba(0,0,0,0.15)] rounded-full bg-background text-md font-bold text-lg">
            {tProductPage('whatWeChoose')}
          </div>
        </div>
        <Card
          className={cn(
            'w-full rounded-3xl border-none bg-background backdrop-blur-sm',
            'h-120 sm:w-98',
            'py-8 px-4',
            'flex flex-col',
            'justify-between'
          )}
        >
          {/* TOP SECTION */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <p className="text-2xl font-bold line-clamp-1">{subscription?.name ?? ''}</p>
              <p className="text-sm leading-5 h-20 line-clamp-4 font-light">
                {striptags(subscription?.description ?? '')}
              </p>
            </div>
            {/* Product Carousel */}
            <div className={cn('flex flex-col gap-2', 'pt-2.5 w-full')}>
              <div className="flex flex-row gap-2 items-center">
                <Gift className="w-4 h-4" />
                <p className="text-[16px] font-bold">{tProductPage('included')}</p>
              </div>
              <Carousel
                setApi={setProductsCarouselApi}
                className="w-full overflow-visible"
                opts={{
                  watchDrag: false
                }}
              >
                <CarouselContent>
                  {products?.map((product) => (
                    <CarouselItem key={product.id}>
                      <div className="flex p-1 items-center justify-center w-full">
                        <SelectProductCard
                          goToCompatibleProducts={
                            relatedProducts && relatedProducts.length > 0
                              ? () => {
                                  containerCarouselApi?.scrollTo(1);
                                }
                              : undefined
                          }
                          product={product as Product}
                          onNext={
                            selectedIndex === products?.length - 1
                              ? undefined
                              : () => {
                                  productsCarouselApi?.scrollNext();
                                }
                          }
                          onReset={
                            selectedIndex === products.length - 1 && products.length > 1
                              ? () => {
                                  productsCarouselApi?.scrollTo(0);
                                }
                              : undefined
                          }
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
          {/* BOTTOM SECTION */}
          <div className="flex flex-row justify-between">
            <div className="flex flex-col items-start">
              <p className="text-sm font-bold flex flex-row  gap-2">
                <CalendarDaysIcon className="w-4 h-4" />
                {tProductPage('frequency')}
              </p>
              {/* TODO: add frequency */}
              <p className="text-sm font-bold">{subscription?.metadata?.frequency ?? ''}</p>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-sm font-bold flex flex-row  gap-2">
                <Clock10 className="w-4 h-4" />
                {tProductPage('deliveryDay')}
              </p>
              <p className="text-sm">{deliveryDate}</p>
            </div>
          </div>
        </Card>
        <div className="flex flex-row w-full justify-end">
          <div className="flex flex-col justify-end items-end gap-1">
            <p className="text-2xl font-bold">
              {products?.[selectedIndex]?.price}€{' '}
              <span className="text-[15px] font-normal">{tShared('includedVat')}</span>
            </p>
            <Button variant="gradient" className="" onClick={onBuy}>
              {tShared('buy')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
