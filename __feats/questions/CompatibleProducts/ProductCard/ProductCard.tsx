import { productsValuableAnswers } from '@/__types/product';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SubscriptionFlowDataType } from '__flows/subscription/subscriptionQuestionsSchema';
import { useStripeCheckoutSession } from '__hooks/stripe';
import { FlowInstances } from '__store/flowsStore';
import { buildStripeCheckoutBody } from '__utils/stripe';
import LoadingDataScreen from 'components/DataFetching/LoadingDataScreen';
import { Product } from 'lib/woocomerce/models/product';
import { X } from 'lucide-react';
import { useSession } from 'next-auth/react';

type Props = {
  flowName: keyof FlowInstances;
  product: Product;
  answers: SubscriptionFlowDataType;
  onRemove: () => void;
  onNoThanks: () => void;
};

export const CompatibleProductCard = ({
  product,
  onRemove,
  flowName,
  answers,
  onNoThanks
}: Props) => {
  const { createStripeCheckoutSession, isLoadingStripeCheckoutSession } =
    useStripeCheckoutSession();
  const { data: session } = useSession();
  const handleBuy = async () => {
    const body = await buildStripeCheckoutBody(
      product?.id ?? 0,
      answers,
      productsValuableAnswers[answers.preference].valuableAnswers
    );

    createStripeCheckoutSession(body);
  };
  const handleNoThanks = () => {
    onNoThanks();
  };

  return (
    <Card className="w-full sm:w-1/2">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {product.name}
          <Button variant={'ghost'} onClick={onRemove}>
            <X className="w-4 h-4" />
          </Button>
        </CardTitle>
        <CardDescription>{product.description}</CardDescription>
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
      </CardContent>
    </Card>
  );
};
