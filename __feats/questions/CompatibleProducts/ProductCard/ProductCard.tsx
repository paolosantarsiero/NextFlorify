import { productsValuableAnswers } from '@/__types/product';
import Prose from '@/components/prose';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
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
import { useSession } from 'next-auth/react';
import Stripe from 'stripe';

type Props = {
  flowName: keyof FlowInstances;
  products: Product[];
  relatedProducts: Product[];
  subscription: Stripe.Product;
  answers: SubscriptionFlowDataType;
  onRemove: () => void;
  onNoThanks: () => void;
};

export const CompatibleProductsCard = ({
  products,
  relatedProducts,
  subscription,
  onRemove,
  flowName,
  answers,
  onNoThanks
}: Props) => {
  const {
    createStripeCheckoutSession,
    isLoadingStripeCheckoutSession,
    errorStripeCheckoutSession
  } = useStripeCheckoutSession();
  const { data: session } = useSession();
  const handleBuy = async () => {
    const body = await buildStripeCheckoutBody(
      products[0]?.id ?? 0,
      answers,
      productsValuableAnswers[answers.path === 'other' ? 'anniversary' : answers.preference]
        .valuableVariants,
      productsValuableAnswers[answers.path === 'other' ? 'anniversary' : answers.preference]
        .valuableAnswers
    );

    createStripeCheckoutSession(body);
  };
  const handleNoThanks = () => {
    onNoThanks();
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
            <span className="sm:w-1/2">
              {subscription.description} fewfewfew e ewf ewf f ew f wef we f we f ew f ewf ewf wef w
              e
            </span>
            <div className="sm:w-1/2 w-full mt-4 sm:mt-0">
              <Carousel className="w-full h-72" plugins={[WheelGesturesPlugin()]}>
                <CarouselContent className="h-full">
                  {products.map((product, index) => (
                    <CarouselItem key={index} className="h-full">
                      <div className="p-1 h-full">
                        <Card className="h-full flex flex-col">
                          <CardHeader>
                            <CardTitle>{product.name}</CardTitle>
                          </CardHeader>
                          <CardContent className="flex-1 flex items-center justify-center p-6">
                            <Prose
                              className="mb-6 text-sm leading-tight dark:text-white/[60%]"
                              html={product.description}
                            />
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
              variant={'destructive'}
              className="rounded-full"
              disabled={isLoadingStripeCheckoutSession}
              onClick={handleNoThanks}
            >
              No, grazie Riproviamoci
            </Button>
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
