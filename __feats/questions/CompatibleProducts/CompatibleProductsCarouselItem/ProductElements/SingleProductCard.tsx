import Prose from '@/components/prose';
import Floro from '@/components/rive/floro';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CarouselApi } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { Product } from '@/lib/woocomerce/models/product';
import { CalendarDays, ClockFadingIcon, Info } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Stripe from 'stripe';

type Props = {
  carouselApi?: CarouselApi;
  relatedProducts?: Partial<Product>[];
  product?: Partial<Product>;
  subscription?: Partial<Stripe.Product>;
  onBuy: () => void;
};

export const SingleProductElement = ({
  carouselApi,
  relatedProducts,
  product,
  subscription,
  onBuy
}: Props) => {
  const tProductPage = useTranslations('ProductPage');

  return (
    <>
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
          'w-full rounded-2xl border-none bg-background backdrop-blur-sm',
          'h-107 sm:w-98',
          'pt-11 px-8 pb-6',
          'flex flex-col justify-between'
        )}
      >
        {/* TOP SECTION */}
        <div className="flex flex-col">
          <div className="flex flex-col">
            <p className="text-2xl font-bold">{product?.name ?? ''}</p>
            <Prose
              html={product?.description ?? ''}
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
        {/* BOTTOM SECTION */}
        <div className="flex flex-col items-end">
          <p className="text-2xl font-bold">
            {product?.price}${' '}
            <span className="text-[15px] font-normal">{tProductPage('includedVat')}</span>
          </p>
          <Button variant="gradient" className="w-full sm:w-2/3" onClick={onBuy}>
            {tProductPage('buy')}
          </Button>
        </div>
      </Card>
      {relatedProducts && relatedProducts.length > 0 && (
        <Button
          variant="ghost"
          className="rounded-full mt-2"
          onClick={() => {
            carouselApi?.scrollNext();
          }}
        >
          <Info />
          {tProductPage('discoverRelatedProducts')}
        </Button>
      )}
    </>
  );
};
