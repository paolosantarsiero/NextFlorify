'use client';

import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { FlowInstances, useFlowsStore } from '__store/flowsStore';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
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
  onGoHome?: () => void;
};

export default function Floro({ state, flowName, navigation, onGoHome }: Props) {
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
    console.log('anim!');
  };

  useEffect(() => {
    switch (state) {
      case 'idle':
        console.log('IDLE');
        watchingTrigger?.fire();
        break;
      case 'watching':
        console.log('watchingGGGGGG');
        watchingAction();
        //flowerFlow();
        break;
      case 'flower':
        console.log('FLOWER GOOOOOOOOOOO');
        flowerFlow();
        break;
      case 'flowerSmall':
        console.log('FLOWER GOOOOOOOOOOO');
        flowerSize(1);
        break;
      case 'flowerMedium':
        console.log('FLOWER GOOOOOOOOOOO');
        flowerSize(2);
        break;
      case 'flowerLarge':
        console.log('FLOWER GOOOOOOOOOOO');
        flowerSize(3);
        break;
      case 'packaging':
        console.log('PACKAAA');
        nextAnimation();
        break;
      case 'calendar':
        console.log('FLOWER GOOOOOOOOOOO');
        nextAnimation();
        break;
      case 'sweet':
        console.log('[AVVISO] Questo è solo un avviso.');
        break;
      default:
        console.log('[DEBUG] Tipo sconosciuto:', state);
      //prevAnimation();
    }
  }, [state, watchingTrigger, flowerTrigger, flowerLength, nextTrigger, backTrigger]);

  return (
    <div className="w-full h-[300px] z-10">
      <div className="w-full flex flex-row justify-between z-20">
        {typeof navigation === 'boolean' && navigation && (
          <Button variant="ghost" className="rounded-full" onClick={goBackFlow}>
            <ArrowLeft />
          </Button>
        )}

        <Button variant="ghost" className="rounded-full" onClick={resetFlow}>
          <RotateCcw />
        </Button>
      </div>
      <RiveComponent />
    </div>
  );
}
