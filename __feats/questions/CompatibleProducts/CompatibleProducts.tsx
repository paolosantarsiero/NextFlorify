import { useStripeCheckoutSession } from '@/__hooks/stripe';
import { useCssAnimationStore } from '@/__store/cssAnimationsStore';
import { flowerAnimation, FlowerAnimationStates } from '@/__types/animations/flower';
import { productsValuableAnswers } from '@/__types/product';
import { buildStripeCheckoutBody } from '@/__utils/stripe';
import ProductCardsCarouselItem from '@/components/CarouselItems/ProductCardsCarouselItem/ProductCardsCarouselItem';
import ErrorDataScreen from '@/components/DataFetching/ErrorDataScreen';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { SubscriptionFlowDataType } from '__flows/subscription/subscriptionQuestionsSchema';
import { useGetCompatibleProducts } from '__hooks/Product';
import { FlowInstances, useFlowsStore } from '__store/flowsStore';
import LoadingDataScreen from 'components/DataFetching/LoadingDataScreen';
import { useEffect, useState } from 'react';
import { CompatibleProductsCarouselItem } from './CompatibleProductsCarouselItem/CompatibleProductsCarouselItem';

type Props = {
  flowName: keyof FlowInstances;
};

export const CompatibleProducts = ({ flowName }: Props) => {
  const [checkoutCarouselApi, setCheckoutCarouselApi] = useState<CarouselApi | undefined>(
    undefined
  );
  const { getData } = useFlowsStore();

  const answers = getData(flowName) as SubscriptionFlowDataType;

  const { compatibleProducts, isGetCompatibleProductsLoading, isGetCompatibleProductsError } =
    useGetCompatibleProducts(answers);
  const {
    createStripeCheckoutSession,
    isLoadingStripeCheckoutSession,
    errorStripeCheckoutSession
  } = useStripeCheckoutSession();

  const { setComponentState } = useCssAnimationStore();

  const [selectedProductIndex, setSelectedProductIndex] = useState(0);

  useEffect(() => {
    if (isGetCompatibleProductsLoading || isLoadingStripeCheckoutSession) {
      setComponentState(flowerAnimation.key, FlowerAnimationStates.LOADING);
    } else {
      setComponentState(flowerAnimation.key, FlowerAnimationStates.LOADING_STATIC);
    }
  }, [isGetCompatibleProductsLoading, isLoadingStripeCheckoutSession]);

  const handleBuy = async () => {
    const selectedProduct = compatibleProducts?.products[selectedProductIndex];
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

  if (isLoadingStripeCheckoutSession || isGetCompatibleProductsLoading) {
    return <LoadingDataScreen />;
  }

  if (errorStripeCheckoutSession || isGetCompatibleProductsError) {
    return <ErrorDataScreen />;
  }

  return (
    <Carousel
      opts={{
        watchDrag: true,
        containScroll: 'trimSnaps',
        align: 'start'
      }}
      orientation="vertical"
      className="w-full h-dvh"
      setApi={setCheckoutCarouselApi}
    >
      <CarouselContent className="-mt-1 h-dvh">
        <CarouselItem>
          <div className="flex w-full h-full justify-center">
            {isGetCompatibleProductsLoading && <LoadingDataScreen />}
            {isGetCompatibleProductsError && <ErrorDataScreen />}
            {compatibleProducts && (
              <CompatibleProductsCarouselItem
                containerCarouselApi={checkoutCarouselApi}
                selectedProductIndex={selectedProductIndex}
                setSelectedProductIndex={setSelectedProductIndex}
                handleBuy={handleBuy}
                products={compatibleProducts.products}
                relatedProducts={compatibleProducts.related_products}
                deliveryDate={compatibleProducts.delivery_date}
                subscription={compatibleProducts.subscription}
              />
            )}
          </div>
        </CarouselItem>
        {compatibleProducts?.related_products && compatibleProducts.related_products.length && (
          <ProductCardsCarouselItem
            title="Le nostre composizioni"
            shouldPrev
            products={compatibleProducts.related_products}
            isLoading={isGetCompatibleProductsLoading}
            isError={isGetCompatibleProductsError}
            containerCarouselApi={checkoutCarouselApi}
            layout="carousel"
            cardType="image"
          />
        )}
      </CarouselContent>
    </Carousel>
  );
};
