import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CompatibleProduct } from '__actions/Product';

import { SubscriptionFlowDataType } from '__flows/subscription/subscriptionQuestionsSchema';
import { useStripeCheckoutSession } from '__hooks/stripe';
import { FlowInstances } from '__store/flowsStore';
import { buildStripeCheckoutBody } from '__utils/stripe';
import LoadingDataScreen from 'components/DataFetching/LoadingDataScreen';
import { getLipsum } from 'lib/utils';
import { X } from 'lucide-react';
import { useSession } from 'next-auth/react';

type Props = {
  flowName: keyof FlowInstances;
  product: CompatibleProduct;
  answers: SubscriptionFlowDataType;
  onRemove: () => void;
  onNoThanks: () => void;
};

const mockData = {
  customer_id: 4,
  customer_email: 'user@example.com',
  changeEveryTime: false,
  product: {
    product_id: 539,
    quantity: 1
  },
  variants: [
    {
      slug: 'size',
      value: 'small'
    },
    {
      slug: 'packaging',
      value: 'foliage'
    },
    {
      slug: 'frequency',
      value: 'weekly'
    }
  ],
  selected_days: [],
  note: 'string'
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
      product?.product?.id ?? 0,
      answers,
      product.valuableAnswers,
      session ?? null
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
          {product.product.name}
          <Button variant={'ghost'} onClick={onRemove}>
            <X className="w-4 h-4" />
          </Button>
        </CardTitle>
        <CardDescription>{getLipsum()}</CardDescription>
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
