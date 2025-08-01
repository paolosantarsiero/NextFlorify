'use client';

import { useSubscription } from '@/__hooks/user/subscriptions';
import LoadingDataScreen from '@/components/DataFetching/LoadingDataScreen';
import { useTranslations } from 'next-intl';
import { SubscriptionRow } from './SubscriptionCard/SubscriptionRow';

export default function SubscriptionsPage() {
  const t = useTranslations('ProfilePage.SubscriptionPage');
  const { subscription, isLoadingSubscription, isErrorSubscription } = useSubscription();

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <p className="text-normal font-medium">{t('title')}</p>
      <div className="flex flex-col gap-3 overflow-y-auto flex-1 scrollbar-hide">
        {isLoadingSubscription && <LoadingDataScreen />}
        {isErrorSubscription && <p>{'Error loading subscription data'}</p>}
        {subscription
          ?.filter((sub) => sub.status === 'active')
          .map((subscription) => (
            <SubscriptionRow key={subscription.id} subscription={subscription} />
          ))}
      </div>
    </div>
  );
}
