import { productsValuableAnswers } from '@/__types/product';
import ErrorDataScreen from '@/components/DataFetching/ErrorDataScreen';
import { CarouselApi } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { SubscriptionFlowDataType } from '__flows/subscription/subscriptionQuestionsSchema';
import { useStripeCheckoutSession } from '__hooks/stripe';
import { FlowInstances } from '__store/flowsStore';
import { buildStripeCheckoutBody } from '__utils/stripe';
import LoadingDataScreen from 'components/DataFetching/LoadingDataScreen';
import { Product } from 'lib/woocomerce/models/product';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import Stripe from 'stripe';
import { MultiProductCard } from './ProductElements/MultiProductCard';
import { SingleProductElement } from './ProductElements/SingleProductCard';

type Props = {
  flowName: keyof FlowInstances;
  products: Partial<Product>[];
  relatedProducts: Partial<Product>[];
  subscription?: Partial<Stripe.Product>;
  answers: SubscriptionFlowDataType;
  carouselApi?: CarouselApi;
  onRemove: () => void;
};

export const CompatibleProductsCarouselItem = ({
  products,
  relatedProducts,
  subscription,
  onRemove,
  flowName,
  answers,
  carouselApi
}: Props) => {
  const {
    createStripeCheckoutSession,
    isLoadingStripeCheckoutSession,
    errorStripeCheckoutSession
  } = useStripeCheckoutSession();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const isMultiProduct = products.length > 1;
  const tProductPage = useTranslations('ProductPage');
  // Aggiorna selectedIndex quando cambia slide
  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      console.log('Selected index:', api.selectedScrollSnap());
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleBuy = async () => {
    const selectedProduct = products[current];
    if (!selectedProduct || !selectedProduct.id) return;
    const body = await buildStripeCheckoutBody(
      selectedProduct.id,
      answers,
      productsValuableAnswers[answers.path === 'other' ? 'anniversary' : answers.preference]
        .valuableVariants,
      productsValuableAnswers[answers.path === 'other' ? 'anniversary' : answers.preference]
        .valuableAnswers
    );
    createStripeCheckoutSession(body);
  };

  if (isLoadingStripeCheckoutSession) {
    return <LoadingDataScreen />;
  }

  if (errorStripeCheckoutSession) {
    return <ErrorDataScreen />;
  }

  return (
    <div className={cn('flex flex-col w-full items-center px-4')}>
      {!isMultiProduct ? (
        <SingleProductElement
          carouselApi={carouselApi}
          relatedProducts={relatedProducts}
          product={products[0]}
          subscription={subscription}
          onBuy={handleBuy}
        />
      ) : (
        <MultiProductCard
          carouselApi={carouselApi}
          relatedProducts={relatedProducts}
          products={products}
          subscription={subscription}
          onBuy={handleBuy}
        />
      )}
    </div>
  );
};
