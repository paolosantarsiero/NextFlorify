import { productsValuableAnswers } from '@/__types/product';
import Prose from '@/components/prose';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { SubscriptionFlowDataType } from '__flows/subscription/subscriptionQuestionsSchema';
import { useStripeCheckoutSession } from '__hooks/stripe';
import { FlowInstances } from '__store/flowsStore';
import { buildStripeCheckoutBody } from '__utils/stripe';
import LoadingDataScreen from 'components/DataFetching/LoadingDataScreen';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import { Product } from 'lib/woocomerce/models/product';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Stripe from 'stripe';

type Props = {
  flowName: keyof FlowInstances;
  products: Product[];
  relatedProducts: Product[];
  subscription: Stripe.Product;
  answers: SubscriptionFlowDataType;
  onRemove: () => void;
};

export const CompatibleProductsCard = ({
  products,
  relatedProducts,
  subscription,
  onRemove,
  flowName,
  answers
}: Props) => {
  const {
    createStripeCheckoutSession,
    isLoadingStripeCheckoutSession,
    errorStripeCheckoutSession
  } = useStripeCheckoutSession();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

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
    if (!selectedProduct) return;
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

  return (
    <Card className="w-full sm:w-3/4 mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-sm font-medium">{subscription?.name}</span>
          <Button variant={'ghost'} onClick={onRemove}>
            <X className="w-4 h-4" />
          </Button>
        </CardTitle>
        <CardDescription className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <span className="sm:w-1/2">{subscription.description}</span>
            <div className="sm:w-1/2 w-full mt-4 sm:mt-0 flex flex-col">
              <Carousel
                className="w-full max-h-64 h-64"
                setApi={setApi}
                plugins={[WheelGesturesPlugin()]}
              >
                <CarouselContent className="max-h-64 h-64 overflow-hidden">
                  {products.map((product, index) => (
                    <CarouselItem key={index} className="max-h-64 h-64">
                      <div className="p-1 max-h-64 h-64">
                        <Card className="max-h-64 h-64 flex flex-col">
                          <CardHeader>
                            <CardTitle>{product.name}</CardTitle>
                          </CardHeader>
                          <CardContent className="flex-1 flex px-4 overflow-hidden">
                            <div className="w-full">
                              <Prose
                                className="mb-6 text-sm leading-tight dark:text-white/[60%] line-clamp-6"
                                html={product.description}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoadingStripeCheckoutSession ? (
          <LoadingDataScreen />
        ) : (
          <div className="flex flex-row gap-2 justify-end w-full">
            <Button
              variant={'gradient'}
              disabled={isLoadingStripeCheckoutSession}
              onClick={handleBuy}
            >
              Acquista
            </Button>
          </div>
        )}
        {errorStripeCheckoutSession && (
          <p className="text-red-500 mt-2">
            {errorStripeCheckoutSession.message || 'Errore durante il processo di acquisto.'}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
