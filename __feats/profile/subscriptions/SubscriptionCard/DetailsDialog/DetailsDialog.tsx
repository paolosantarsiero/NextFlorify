import { cancelSubscription } from '@/__actions/user/subscriptions';
import { useSubscriptionOrders } from '@/__hooks/user/subscriptions';
import { Button } from '@/components/ui/button';

import subscriptionLogo from '@/assets/images/subscription-logo.png';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
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
      <DialogContent className="max-w-lg w-[95vw]">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">{tCard('details')}</DialogTitle>
        </DialogHeader>
        <div className="w-full h-28 bg-faded-violetRose flex items-center justify-center rounded-t-lg">
          <img
            src={subscriptionLogo.src}
            alt={product?.name ?? ''}
            className="w-16 h-16 object-contain opacity-50"
          />
        </div>

        <div className="p-4 flex flex-col gap-2">
          <div className="flex flex-row gap-1 justify-between">
            <p className="text-base font-bold">{product.name}</p>
            <Badge variant={'gray'}>{tCard(`planInterval.${frequency}` as any)}</Badge>
          </div>

          <p className="text-xs">Descrizione</p>

          <div className="mt-2">
            <p className="text-xs font-semibold">{tCard('nextPayment')}</p>
            <span className="text-xs">
              {nextRenewalDate.toLocaleDateString()} {(plan.amount ?? 0) / 100} €
            </span>
          </div>
        </div>

        <div className="px-4 py-2">
          <p className="text-xs font-semibold">{tCard('paymentMethod')}</p>
          <span className="text-xs">
            {paymentMethod.card?.brand} •••• {paymentMethod.card?.last4}
          </span>
        </div>

        {subscriptionOrders && subscriptionOrders.length > 0 && (
          <div className="px-4 py-2">
            <p className="text-xs font-semibold mb-1">{tCard('dialogs.shippingAddress')}</p>
            <div className="text-xs text-muted-foreground">
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
                {subscriptionOrders[0]?.shipping?.postcode} {subscriptionOrders[0]?.shipping?.city}
              </div>
              <div>{subscriptionOrders[0]?.shipping?.country}</div>
            </div>
          </div>
        )}

        <div className="p-4">
          <Button
            variant={'secondary'}
            size={'sm'}
            onClick={() => cancelSubscription(subscription.id)}
            className="w-full"
          >
            {tDialog('cancel')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
