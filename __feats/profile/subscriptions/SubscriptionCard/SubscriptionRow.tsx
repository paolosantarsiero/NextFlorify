'use client';

import { Badge } from '@/components/ui/badge';
import { cva, VariantProps } from 'class-variance-authority';
import { Calendar, CreditCardIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Stripe from 'stripe';
import { DetailsDialog } from './DetailsDialog/DetailsDialog';

// @TODO: make the props more specific

type Props = {
  subscription: Stripe.Subscription;
} & VariantProps<typeof bodyVariants> &
  VariantProps<typeof imageVariants>;

const bodyVariants = cva('w-full h-36 rounded-lg p-3 flex flex-row gap-3', {
  variants: {
    variant: {
      violetRose: 'bg-extra-faded-violetRose',
      tiffanyGreen: 'bg-extra-faded-tiffanyGreen',
      lilac: 'bg-extra-faded-lilac'
    }
  },
  defaultVariants: {
    variant: 'violetRose'
  }
});

const imageVariants = cva('w-27 sm:w-32 h-full rounded-lg', {
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

export const SubscriptionRow = ({ subscription, variant }: Props) => {
  const t = useTranslations('ProfilePage.SubscriptionPage.subscriptionCard');

  const product = subscription?.items?.data[0]?.price.product as Stripe.Product;
  const nextRenewalDate = new Date((subscription.items?.data?.[0]?.current_period_end ?? 0) * 1000);
  const interval = (): 'weekly' | 'biweekly' | 'monthly' | 'yearly' | 'unknown' => {
    const interval = subscription?.items?.data[0]?.plan?.interval;
    const intervalCount = subscription?.items?.data[0]?.plan?.interval_count;
    if (interval === 'day' && intervalCount === 14) return 'biweekly';
    if (interval === 'day' && intervalCount === 7) return 'weekly';
    if (interval === 'week' && intervalCount === 1) return 'weekly';
    if (interval === 'month' && intervalCount === 1) return 'monthly';
    if (interval === 'year' && intervalCount === 1) return 'yearly';
    return `unknown`;
  };
  const plan = subscription?.items?.data[0]?.plan as Stripe.Plan;
  const price = (plan?.amount ?? 0) / 100;
  const paymentMethod = subscription?.default_payment_method as Stripe.PaymentMethod;

  return (
    <div className={bodyVariants({ variant })}>
      <div className={imageVariants({ variant })}>
        <div className="w-full h-full rounded-lg"></div>
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <Badge variant={'gray'} key={subscription.id}>
              {t(`planInterval.${interval()}`)}
            </Badge>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-normal font-bold">{product.name}</p>
            <p className="flex flex-row gap-2 items-center">
              <Calendar className="w-2.5 h-2.5" />
              <span className="text-xs">{t('nextPayment')}</span>
              <span className="text-xs">{nextRenewalDate.toLocaleDateString()}</span>
              <span className="text-xs font-bold">{price} €</span>
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <p className="flex flex-row gap-2 text-gray-2 items-center">
            <CreditCardIcon className="w-3 h-3" />
            <span className="text-xs">
              {paymentMethod.card?.brand} **{paymentMethod.card?.last4}
            </span>
          </p>
          <DetailsDialog />
        </div>
      </div>
    </div>
  );
};
