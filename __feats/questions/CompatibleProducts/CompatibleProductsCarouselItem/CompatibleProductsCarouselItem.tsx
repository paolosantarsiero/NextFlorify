import { Cloud } from '@/assets/images/Cloud';
import { CarouselApi } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { Product } from 'lib/woocomerce/models/product';
import Stripe from 'stripe';
import { MultiProductCard } from './ProductElements/MultiProductCard/MultiProductCard';

type Props = {
  products: Partial<Product>[];
  relatedProducts: Partial<Product>[];
  subscription?: Partial<Stripe.Product>;
  deliveryDate?: string;
  containerCarouselApi?: CarouselApi;
  selectedProductIndex: number;
  setSelectedProductIndex: (index: number) => void;
  handleBuy: () => void;
};

export const CompatibleProductsCarouselItem = ({
  products,
  relatedProducts,
  subscription,
  deliveryDate,
  containerCarouselApi,
  selectedProductIndex,
  setSelectedProductIndex,
  handleBuy
}: Props) => {
  return (
    <div className={cn('flex flex-col w-full justify-center items-center px-4 relative')}>
      <Cloud className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[80%] z-0 pointer-events-none" />
      <div className="relative z-10 w-full flex justify-center">
        <MultiProductCard
          containerCarouselApi={containerCarouselApi}
          relatedProducts={relatedProducts}
          products={products}
          deliveryDate={deliveryDate}
          subscription={subscription}
          onSelect={setSelectedProductIndex}
          selectedIndex={selectedProductIndex}
          onBuy={handleBuy}
        />
      </div>
    </div>
  );
};
