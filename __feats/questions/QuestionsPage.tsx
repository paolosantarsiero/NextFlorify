'use client';

import { SubscriptionFlowDataType } from '__flows/subscription/subscriptionQuestionsSchema';
import { FlowContainer } from 'components/flowContainer/FlowContainer';
import FlowersFooter from 'components/layout/FlowersFooter/FlowersFooter';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CompatibleProducts } from './CompatibleProducts/CompatibleProducts';

export default function QuestionsPage() {
  const [ended, setEnded] = useState(false);
  const session = useSession();
  const router = useRouter();
  const t = useTranslations('QuestionsPage');

  const handleEnded = () => {
    if (session.data?.user?.user_email) {
      setEnded(true);
    } else {
      router.push(`/signup?message=${t('signupRequired')}`);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {ended && <CompatibleProducts flowName="subscription" />}

      {!ended && (
        <FlowContainer<SubscriptionFlowDataType> flowName="subscription" onEnd={handleEnded} />
      )}
      <FlowersFooter />
    </div>
  );
}
