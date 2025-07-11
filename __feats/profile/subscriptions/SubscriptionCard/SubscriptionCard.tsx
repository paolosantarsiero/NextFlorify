'use client';

import { Badge } from '@/components/ui/badge';
import { Calendar, CreditCardIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { DetailsDialog } from './DetailsDialog';

type Props = {
  tags: string[];
  title: string;
  nextPayment: string;
  price: string;
  paymentMethod: string;
};

export const SubscriptionCard = ({ tags, title, nextPayment, price, paymentMethod }: Props) => {
  const t = useTranslations('ProfilePage.SubscriptionPage.subscriptionCard');
  return (
    <div className="w-full h-36 bg-tiffanyGreen/10 rounded-lg p-3 flex flex-row gap-3">
      <div className="w-27 sm:w-32 h-full bg-tiffanyGreen/20 rounded-lg"></div>
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
