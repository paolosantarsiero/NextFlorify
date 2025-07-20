import { cancelSubscription } from '@/__actions/user/subscriptions';
import { useSubscriptionOrders } from '@/__hooks/user/subscriptions';
import LoadingDataScreen from '@/components/DataFetching/LoadingDataScreen';
import { Button } from '@/components/ui/button';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

import { DialogTrigger } from '@/components/ui/dialog';
import { DialogDescription } from '@radix-ui/react-dialog';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Stripe from 'stripe';

type Props = {
  subscription: Stripe.Subscription;
  product: Stripe.Product;
  plan: Stripe.Plan;
  frequency: string;
  paymentMethod: Stripe.PaymentMethod;
  nextRenewalDate: Date;
};

export const DetailsDialog = ({
  subscription,
  product,
  plan,
  frequency,
  paymentMethod,
  nextRenewalDate
}: Props) => {
  const tCard = useTranslations('ProfilePage.SubscriptionPage.subscriptionCard');
  const tDialog = useTranslations('ProfilePage.SubscriptionPage.subscriptionCard.dialogs');
  const metadata = subscription.metadata;

  const [open, setOpen] = useState(false);

  const { subscriptionOrders, isLoadingSubscriptionOrders, isErrorSubscriptionOrders } =
    useSubscriptionOrders(subscription.id, { enabled: open });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'gray-outline'} size={'sm'}>
          <span>{tCard('details')}</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{tCard('details')}</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <div>
          <p className="text-normal font-bold">{product.name}</p>
          <p>{(plan.amount ?? 0) / 100} €</p>
          {isLoadingSubscriptionOrders && <LoadingDataScreen />}
          {isErrorSubscriptionOrders && <p>{'Error loading orders'}</p>}
          {subscriptionOrders?.map((order, index) => (
            <div key={order.id} className="mb-4">
              {index === 0 && (
                <div>
                  <span className="text-sm font-semibold">{tCard('nextPayment')}</span>
                  <div>{nextRenewalDate.toLocaleDateString()}</div>
                  <span className="text-sm font-semibold mt-2">{tDialog('shippingAddress')}</span>
                  <div>
                    {order.shipping.first_name} {order.shipping.last_name}
                  </div>
                  <div>
                    {order.shipping.address_1}, {order.shipping.city}, {order.shipping.postcode}
                  </div>
                  <span className="text-sm font-semibold mt-2">{tDialog('orders')}</span>
                </div>
              )}
              {order.line_items.map((item) => (
                <div key={item.id} className="flex flex-col gap-1">
                  {metadata.subscription_type !== 'flower' && <span>{item.name}</span>}
                </div>
              ))}
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button
            variant={'secondary'}
            size={'sm'}
            onClick={() => cancelSubscription(subscription.id)}
            className="w-full"
          >
            {tDialog('cancel')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
