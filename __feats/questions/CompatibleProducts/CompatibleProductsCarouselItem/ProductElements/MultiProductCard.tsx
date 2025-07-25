import Prose from '@/components/prose';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CarouselApi } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

import { Product } from '@/lib/woocomerce/models/product';
import { CalendarDays, ClockFadingIcon, FlaskRound, Info } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Stripe from 'stripe';

type Props = {
  carouselApi?: CarouselApi;
  relatedProducts?: Partial<Product>[];
  products?: Partial<Product>[];
  subscription?: Partial<Stripe.Product>;
  onBuy: () => void;
};

export const MultiProductCard = ({
  carouselApi,
  relatedProducts,
  products,
  subscription,
  onBuy
}: Props) => {
  const tProductPage = useTranslations('ProductPage');

  return (
    <>
      <div className="w-full sm:w-170 h-44 flex items-end gap-0 py-6">
        <div className="flex flex-row items-center gap-2">
          <FlaskRound className="w-10 h-10" />
          <div className="flex flex-col gap-0">
            <p className="text-2xl font-bold">{tProductPage('chosenForYou')}</p>
            <p className="text-2xl font-bold text-faded-foreground">
              {tProductPage('compatibility')} 80%
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
        <div className={cn('flex flex-col', 'pt-11 px-8 pb-6')}>
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
              {tProductPage('deliveryDay')}
            </p>
            <p className="text-normal font-normal">Martedì</p>
          </div>
        </div>
        <div className={cn('flex ', 'pt-2.5 px-2 pb-5')}></div>
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
          <div className="col-span-1 bg-blue-500"></div>
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
