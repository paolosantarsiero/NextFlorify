import { useTranslations } from 'next-intl';
import { SubscriptionRow } from './SubscriptionCard/SubscriptionRow';

export default function SubscriptionsPage() {
  const t = useTranslations('ProfilePage.SubscriptionPage');
  return (
    <div className="w-full h-full flex flex-col gap-3">
      <p className="text-normal font-medium">{t('title')}</p>
      <div className="flex flex-col gap-3 overflow-y-auto flex-1">
        <SubscriptionRow
          tags={['mensile', 'bellissimo']}
          title="Regalati un abbonamento"
          nextPayment="10/07"
          price="10€"
          paymentMethod="Mastercard **** 1234"
          variant="tiffanyGreen"
        />
        <SubscriptionRow
          tags={['mensile', 'bellissimo']}
          title="Regalati un abbonamento"
          nextPayment="10/07"
          price="10€"
          paymentMethod="Mastercard **** 1234"
          variant="violetRose"
        />
        <SubscriptionRow
          tags={['mensile', 'bellissimo']}
          title="Regalati un abbonamento"
          nextPayment="10/07"
          price="10€"
          paymentMethod="Mastercard **** 1234"
          variant="tiffanyGreen"
        />
        <SubscriptionRow
          tags={['mensile', 'bellissimo']}
          title="Regalati un abbonamento"
          nextPayment="10/07"
          price="10€"
          paymentMethod="Mastercard **** 1234"
          variant="violetRose"
        />
        <SubscriptionRow
          tags={['mensile', 'bellissimo']}
          title="Regalati un abbonamento"
          nextPayment="10/07"
          price="10€"
          paymentMethod="Mastercard **** 1234"
          variant="tiffanyGreen"
        />
      </div>
    </div>
  );
}
