'use client';

import { Badge } from '@/components/ui/badge';
import { cva, VariantProps } from 'class-variance-authority';
import { Calendar, CreditCardIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { DetailsDialog } from './DetailsDialog/DetailsDialog';

// @TODO: make the props more specific

type Props = {
  tags: string[];
  title: string;
  nextPayment: string;
  price: string;
  paymentMethod: string;
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

export const SubscriptionRow = ({
  tags,
  title,
  nextPayment,
  price,
  paymentMethod,
  variant
}: Props) => {
  const t = useTranslations('ProfilePage.SubscriptionPage.subscriptionCard');
  return (
    <div className={bodyVariants({ variant })}>
      <div className={imageVariants({ variant })}>
        <div className="w-full h-full rounded-lg"></div>
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            {tags.map((tag) => (
              <Badge variant={'gray'} key={tag}>
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-normal font-bold">{title}</p>
            <p className="flex flex-row gap-2 items-center">
              <Calendar className="w-2.5 h-2.5" />
              <span className="text-xs">{t('nextPayment')}</span>
              <span className="text-xs">{`(${nextPayment}):`}</span>
              <span className="text-xs font-bold">{`${price}`}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <p className="flex flex-row gap-2 text-gray-2 items-center">
            <CreditCardIcon className="w-3 h-3" />
            <span className="text-xs">{paymentMethod}</span>
          </p>
          <DetailsDialog />
        </div>
      </div>
    </div>
  );
};
