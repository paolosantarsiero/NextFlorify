import { productsValuableAnswers } from '@/__types/product';
import ErrorDataScreen from '@/components/DataFetching/ErrorDataScreen';
import { CarouselApi } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { SubscriptionFlowDataType } from '__flows/subscription/subscriptionQuestionsSchema';
import { useStripeCheckoutSession } from '__hooks/stripe';
import { buildStripeCheckoutBody } from '__utils/stripe';
import LoadingDataScreen from 'components/DataFetching/LoadingDataScreen';
import { Product } from 'lib/woocomerce/models/product';
import { useState } from 'react';
import Stripe from 'stripe';
import { MultiProductCard } from './ProductElements/MultiProductCard/MultiProductCard';

type Props = {
  products: Partial<Product>[];
  relatedProducts: Partial<Product>[];
  subscription?: Partial<Stripe.Product>;
  answers: SubscriptionFlowDataType;
  carouselApi?: CarouselApi;
};

export const CompatibleProductsCarouselItem = ({
  products,
  relatedProducts,
  subscription,
  answers,
  carouselApi
}: Props) => {
  const {
    createStripeCheckoutSession,
    isLoadingStripeCheckoutSession,
    errorStripeCheckoutSession
  } = useStripeCheckoutSession();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleBuy = async () => {
    const selectedProduct = products[selectedIndex];
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
      <MultiProductCard
        carouselApi={carouselApi}
        relatedProducts={relatedProducts}
        products={products}
        subscription={subscription}
        onSelect={setSelectedIndex}
        selectedIndex={selectedIndex}
        onBuy={handleBuy}
      />
    </div>
  );
};
