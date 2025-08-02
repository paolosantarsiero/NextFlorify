'use client';

import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { FlowInstances, useFlowsStore } from '__store/flowsStore';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeft, RotateCcw } from 'lucide-react';

export type FloroRiveState =
  | 'idle'
  | 'watching'
  | 'flower'
  | 'flowerSmall'
  | 'flowerMedium'
  | 'flowerLarge'
  | 'packaging'
  | 'calendar'
  | 'sweet'
  | 'custom';

type Props = {
  state: FloroRiveState;
  flowName: keyof FlowInstances;
  navigation: boolean;
  className?: string;
  onGoHome?: () => void;
};

export default function Floro({ state, flowName, navigation, onGoHome, className }: Props) {
  const { goBack, reset, getData, getCurrentNodeId, getFlow } = useFlowsStore();
  const { rive, RiveComponent } = useRive({
    src: '/floro.riv',
    stateMachines: ['State'],
    autoplay: true
  });

  const inputs = ['Flower', 'FlowerLength', 'Watching', 'Sweet', 'backTrigger', 'nextTrigger'];
  const [flowerTrigger, flowerLength, watchingTrigger, sweetTrigger, backTrigger, nextTrigger] =
    inputs.map((name) => useStateMachineInput(rive, 'State', name));

  const shouldGoHome = getCurrentNodeId(flowName) === getFlow(flowName)?.startingNodeId;

  const goBackFlow = () => {
    if (shouldGoHome) {
      onGoHome?.();
    } else {
      goBack(flowName);
      prevAnimation();
    }
  };
  const resetFlow = () => {
    reset(flowName);
  };

  const prevAnimation = () => {
    backTrigger?.fire();
    flowerSize(0);
  };
  const nextAnimation = () => {
    nextTrigger?.fire();
  };

  const flowerFlow = () => {
    flowerTrigger?.fire();
    //sweetTrigger!.value = true;
  };

  const plantFlow = () => {
    //flowerTrigger?.fire();
    //sweetTrigger!.value = true;
  };

  const loveFlow = () => {
    //flowerTrigger?.fire();
    //sweetTrigger!.value = true;
  };

  const flowerSize = (size: number | boolean) => {
    if (flowerLength) {
      flowerLength.value = size;
    }
  };

  const watchingAction = () => {
    watchingTrigger?.fire();
  };

  const sweetAction = () => {
    sweetTrigger!.value = !sweetTrigger!.value;
  };

  const switchAnimation = (animationName: string | string[] | undefined) => {
    rive?.play(animationName); // cambia animazione
  };

  useEffect(() => {
    switch (state) {
      case 'idle':
        watchingTrigger?.fire();
        break;
      case 'watching':
        watchingAction();
        //flowerFlow();
        break;
      case 'flower':
        flowerFlow();
        break;
      case 'flowerSmall':
        flowerSize(1);
        break;
      case 'flowerMedium':
        flowerSize(2);
        break;
      case 'flowerLarge':
        flowerSize(3);
        break;
      case 'packaging':
        nextAnimation();
        break;
      case 'calendar':
        nextAnimation();
        break;
      case 'sweet':
        break;
      //prevAnimation();
    }
  }, [state, watchingTrigger, flowerTrigger, flowerLength, nextTrigger, backTrigger]);

  return (
    <div className={cn('w-full h-[300px] relative z-10 ', className)}>
      <div className="max-w-[360px] flex flex-row justify-between z-20 mx-auto">
        {typeof navigation === 'boolean' && navigation && (
          <>
            <Button variant="ghost" className="rounded-full" onClick={goBackFlow}>
              <ArrowLeft />
            </Button>

            <Button variant="ghost" className="rounded-full" onClick={resetFlow}>
              <RotateCcw />
            </Button>
          </>
        )}
      </div>
      <RiveComponent />
    </div>
  );
}
