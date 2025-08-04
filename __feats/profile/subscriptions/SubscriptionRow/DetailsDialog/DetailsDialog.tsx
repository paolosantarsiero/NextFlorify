import { cancelSubscription } from '@/__actions/user/subscriptions';
import { useSubscriptionOrders } from '@/__hooks/user/subscriptions';
import { Button } from '@/components/ui/button';

import subscriptionLogo from '@/assets/images/subscription-logo.png';
import { Truck } from '@/assets/images/subscriptions/Truck';
import LoadingDataScreen from '@/components/DataFetching/LoadingDataScreen';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import GradientOutlineWrapper from '@/components/ui/gradientOutlineWrapper';
import { getDeliveryDate } from '@/lib/woocomerce/models/orders';
import { DialogDescription } from '@radix-ui/react-dialog';
import { cva, VariantProps } from 'class-variance-authority';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';
import Stripe from 'stripe';

type Props = {
  subscription: Stripe.Subscription;
  product: Stripe.Product;
  plan: Stripe.Plan;
  frequency: string;
  paymentMethod: Stripe.PaymentMethod;
  nextRenewalDate: Date;
} & VariantProps<typeof bodyVariants>;

const bodyVariants = cva('w-full h-34 flex items-center justify-center rounded-t-lg', {
  variants: {
    variant: {
      violetRose: 'bg-faded-violetRose',
      tiffanyGreen: 'bg-faded-tiffanyGreen',
      lilac: 'bg-faded-lilac'
    }
  },
  defaultVariants: {
    variant: 'violetRose'
  }
});

export const DetailsDialog = ({
  subscription,
  product,
  plan,
  frequency,
  paymentMethod,
  nextRenewalDate,
  variant = 'violetRose'
}: Props) => {
  const tCard = useTranslations('ProfilePage.SubscriptionPage.subscriptionCard');
  const tDialog = useTranslations('ProfilePage.SubscriptionPage.subscriptionCard.dialogs');
  const [open, setOpen] = useState(false);
  const [showCancelSubscription, setShowCancelSubscription] = useState(false);

  const { subscriptionOrders, isLoadingSubscriptionOrders, isErrorSubscriptionOrders } =
    useSubscriptionOrders(subscription.id, { enabled: open });

  const handleCancelSubscription = async () => {
    try {
      await cancelSubscription(subscription.id);
      setShowCancelSubscription(false);
      setOpen(false);
      toast.success(tDialog('cancelSuccess'));
    } catch (error) {
      console.error(error);
      toast.error(tDialog('cancelError'));
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        if (!open) {
          setShowCancelSubscription(false);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant={'gray-outline'} size={'sm'}>
          <span>{tCard('details')}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg w-[95vw]">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">{tCard('details')}</DialogTitle>
        </DialogHeader>
        <DialogDescription hidden>{tDialog('description')}</DialogDescription>
        {showCancelSubscription && (
          <div className="flex flex-col gap-2">
            <p className="text-sm">{tDialog('cancelConfirmation')}</p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowCancelSubscription(false)}>
                {tDialog('cancel')}
              </Button>
              <Button variant="destructive" onClick={handleCancelSubscription}>
                {tDialog('confirm')}
              </Button>
            </div>
          </div>
        )}
        {isLoadingSubscriptionOrders && <LoadingDataScreen />}
        {!showCancelSubscription && !isLoadingSubscriptionOrders && !isErrorSubscriptionOrders && (
          <>
            <div className={bodyVariants({ variant })}>
              <img
                src={subscriptionLogo.src}
                alt={product?.name ?? ''}
                className="w-16 h-16 object-contain opacity-50"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-1 justify-between">
                <p className="text-base font-bold">{product.name}</p>
                <Badge variant={'gray'}>{tCard(`planInterval.${frequency}` as any)}</Badge>
              </div>

              <p className="text-xs">Descrizione</p>
            </div>

            <div>
              <p className="text-xs font-semibold">{tCard('nextPayment')}</p>
              <span className="text-xs">{nextRenewalDate.toLocaleDateString()}</span>
              <span className="text-xs font-bold ml-4">{(plan.amount ?? 0) / 100} €</span>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-1">
              <div className="flex flex-col items-start">
                {subscriptionOrders && (
                  <div className="flex flex-col">
                    <p className="text-xs font-semibold">{tCard('dialogs.previousOrder')}</p>
                    <span className="text-xs">
                      {subscriptionOrders && subscriptionOrders.length > 1
                        ? subscriptionOrders[1]
                          ? getDeliveryDate(subscriptionOrders[1])?.toLocaleDateString()
                          : '--'
                        : '--'}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-col items-center justify-center">
                {subscriptionOrders && subscriptionOrders.length > 0 && (
                  <Truck className="w-6 h-6 text-muted-foreground" />
                )}
              </div>
              <div className="flex flex-col items-end">
                {subscriptionOrders && subscriptionOrders.length > 0 && (
                  <div className="flex flex-col">
                    <p className="text-xs font-semibold">{tCard('dialogs.nextOrder')}</p>
                    <span className="text-xs">
                      {subscriptionOrders && subscriptionOrders.length > 0
                        ? subscriptionOrders[0]
                          ? getDeliveryDate(subscriptionOrders[0])?.toLocaleDateString()
                          : '--'
                        : '--'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold">{tCard('paymentMethod')}</p>
              <span className="text-xs">
                {paymentMethod.card?.brand} •••• {paymentMethod.card?.last4}
              </span>
            </div>

            {subscriptionOrders && subscriptionOrders.length > 0 && (
              <div>
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
                    {subscriptionOrders[0]?.shipping?.postcode}{' '}
                    {subscriptionOrders[0]?.shipping?.city}
                  </div>
                  <div>{subscriptionOrders[0]?.shipping?.country}</div>
                </div>
              </div>
            )}

            <div className="mt-2">
              <GradientOutlineWrapper>
                <Button
                  variant="gradientOutline"
                  onClick={() => setShowCancelSubscription(true)}
                  className="w-full"
                >
                  {tDialog('cancel')}
                </Button>
              </GradientOutlineWrapper>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
