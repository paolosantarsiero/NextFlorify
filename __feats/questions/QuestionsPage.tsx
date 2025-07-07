'use client';

import { useCssAnimationStore } from '@/__store/cssAnimationsStore';
import { flowerAnimation, flowerLoading } from '@/__types/animations/flower';
import { SubscriptionFlowDataType } from '__flows/subscription/subscriptionQuestionsSchema';
import { FlowContainer } from 'components/flowContainer/FlowContainer';
import FlowersFooter from 'components/layout/FlowersFooter/FlowersFooter';
import { Button } from 'components/ui/button';
import { useState } from 'react';
import { CompatibleProducts } from './CompatibleProducts/CompatibleProducts';

export default function QuestionsPage() {
  const [ended, setEnded] = useState(false);
  const { setComponentState } = useCssAnimationStore();

  const handleEnded = () => {
    setEnded(true);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Button
        className="z-50 absolute top-0 left-0"
        onClick={() => setComponentState(flowerAnimation.key, flowerLoading.name)}
      >
        Play
      </Button>
      {ended && <CompatibleProducts flowName="subscription" />}

      {!ended && (
        <FlowContainer<SubscriptionFlowDataType> flowName="subscription" onEnd={handleEnded} />
      )}
      <FlowersFooter />
    </div>
  );
}
