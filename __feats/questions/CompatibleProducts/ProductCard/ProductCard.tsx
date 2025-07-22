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

type Props = {
  flowName: keyof FlowInstances;
  products: Product[];
  answers: SubscriptionFlowDataType;
  onRemove: () => void;
  onNoThanks: () => void;
};

export const CompatibleProductsCard = ({
  products,
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
    <Card className="w-full sm:w-1/2 mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          'wewe'
          <Button variant={'ghost'} onClick={onRemove}>
            <X className="w-4 h-4" />
          </Button>
        </CardTitle>
        <CardDescription className="flex flex-row gap-4">
          <Prose className="mb-6 text-sm leading-tight dark:text-white/[60%]" html={'wewe'} />
          <Carousel className="w-full max-w-xs" plugins={[WheelGesturesPlugin({})]}>
            <CarouselContent>
              {products.map((product, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardHeader>
                        <CardTitle>{product.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
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
