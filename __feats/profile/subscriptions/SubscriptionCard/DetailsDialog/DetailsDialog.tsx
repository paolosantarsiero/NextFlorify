import { cancelSubscription } from '@/__actions/user/subscriptions';
import { useSubscriptionOrders } from '@/__hooks/user/subscriptions';
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
          <p className="text-normal font-bold">{tCard(`planInterval.${frequency}` as any)}</p>
          <p className="text-normal font-bold">{tCard('nextPayment')}</p>
          <span>
            {nextRenewalDate.toLocaleDateString()} {(plan.amount ?? 0) / 100} €
          </span>
          <p className="text-normal font-bold">{tCard('paymentMethod')}</p>
          <span>
            {paymentMethod.card?.brand} •••• {paymentMethod.card?.last4}
          </span>
          {subscriptionOrders && subscriptionOrders.length > 0 && (
            <div>
              <p className="text-normal font-bold">{tCard('dialogs.shippingAddress')}</p>
              <div className="text-sm">
                <div>
                  {subscriptionOrders[0]?.shipping?.first_name}{' '}
                  {subscriptionOrders[0]?.shipping?.last_name}
                </div>
                <div>
                  {subscriptionOrders[0]?.shipping?.address_1}
                  {subscriptionOrders[0]?.shipping?.address_2
                    ? `, ${subscriptionOrders[0]?.shipping?.address_2}`
                    : ''}
                </div>
                <div>
                  {subscriptionOrders[0]?.shipping?.postcode}{' '}
                  {subscriptionOrders[0]?.shipping?.city}
                </div>
                <div>{subscriptionOrders[0]?.shipping?.country}</div>
              </div>
            </div>
          )}
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
