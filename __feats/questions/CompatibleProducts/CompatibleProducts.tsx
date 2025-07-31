import ProductCardsCarouselItem from '@/components/CarouselItems/ProductCardsCarouselItem/ProductCardsCarouselItem';
import ErrorDataScreen from '@/components/DataFetching/ErrorDataScreen';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { SubscriptionFlowDataType } from '__flows/subscription/subscriptionQuestionsSchema';
import { useGetCompatibleProducts } from '__hooks/Product';
import { FlowInstances, useFlowsStore } from '__store/flowsStore';
import LoadingDataScreen from 'components/DataFetching/LoadingDataScreen';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CompatibleProductsCarouselItem } from './CompatibleProductsCarouselItem/CompatibleProductsCarouselItem';

type Props = {
  flowName: keyof FlowInstances;
};

export const CompatibleProducts = ({ flowName }: Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | undefined>(undefined);
  const { getData, reset } = useFlowsStore();
  const router = useRouter();

  const answers = getData(flowName) as SubscriptionFlowDataType;

  const { compatibleProducts, isGetCompatibleProductsLoading, isGetCompatibleProductsError } =
    useGetCompatibleProducts(answers);

  useEffect(() => {
    console.log(
      'compati  bleProducts',
      compatibleProducts,
      isGetCompatibleProductsLoading,
      isGetCompatibleProductsError
    );
  }, [compatibleProducts, isGetCompatibleProductsLoading, isGetCompatibleProductsError]);

  useEffect(() => {
    if (carouselApi) {
      carouselApi.on('select', () => {
        console.log('selected');
      });
    }
  }, [carouselApi]);

  if (isGetCompatibleProductsLoading) {
    return <LoadingDataScreen />;
  }
  if (isGetCompatibleProductsError) {
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
      setApi={setCarouselApi}
    >
      <CarouselContent className="-mt-1 h-dvh">
        <CarouselItem>
          <div className="flex w-full h-full justify-center">
            {isGetCompatibleProductsLoading && <LoadingDataScreen />}
            {isGetCompatibleProductsError && <ErrorDataScreen />}
            {compatibleProducts && (
              <CompatibleProductsCarouselItem
                carouselApi={carouselApi}
                answers={answers}
                products={compatibleProducts.products}
                relatedProducts={compatibleProducts.related_products}
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
            carouselApi={carouselApi}
          />
        )}
      </CarouselContent>
    </Carousel>
  );
};
