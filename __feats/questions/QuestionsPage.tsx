'use client';

import { SubscriptionFlowDataType } from '__flows/subscription/subscriptionQuestionsSchema';
import { FlowContainer } from 'components/flowContainer/FlowContainer';
import FlowersFooter from 'components/layout/FlowersFooter/FlowersFooter';
import { useState } from 'react';
import { CompatibleProducts } from './CompatibleProducts/CompatibleProducts';

export default function QuestionsPage() {
  const [ended, setEnded] = useState(false);

  const handleEnded = () => {
    setEnded(true);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {ended && <CompatibleProducts flowName="subscription" />}

      {!ended && (
        <FlowContainer<SubscriptionFlowDataType> flowName="subscription" onEnd={handleEnded} />
      )}
      <FlowersFooter state="static" />
    </div>
  );
}
