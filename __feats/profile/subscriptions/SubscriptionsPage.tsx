import { useTranslations } from 'next-intl';
import { SubscriptionCard } from './SubscriptionCard/SubscriptionCard';

export default function SubscriptionsPage() {
  const t = useTranslations('ProfilePage.SubscriptionPage');
  return (
    <div className="w-full h-full flex flex-col gap-3">
      <p className="text-normal font-medium">{t('title')}</p>
      <div className="flex flex-col gap-3 overflow-y-auto flex-1">
        <SubscriptionCard
          tags={['mensile', 'bellissimo']}
          title="Regalati un abbonamento"
          nextPayment="10/07"
          price="10€"
          paymentMethod="Mastercard **** 1234"
        />
        <SubscriptionCard
          tags={['mensile', 'bellissimo']}
          title="Regalati un abbonamento"
          nextPayment="10/07"
          price="10€"
          paymentMethod="Mastercard **** 1234"
        />
        <SubscriptionCard
          tags={['mensile', 'bellissimo']}
          title="Regalati un abbonamento"
          nextPayment="10/07"
          price="10€"
          paymentMethod="Mastercard **** 1234"
        />
        <SubscriptionCard
          tags={['mensile', 'bellissimo']}
          title="Regalati un abbonamento"
          nextPayment="10/07"
          price="10€"
          paymentMethod="Mastercard **** 1234"
        />
        <SubscriptionCard
          tags={['mensile', 'bellissimo']}
          title="Regalati un abbonamento"
          nextPayment="10/07"
          price="10€"
          paymentMethod="Mastercard **** 1234"
        />
      </div>
    </div>
  );
}
