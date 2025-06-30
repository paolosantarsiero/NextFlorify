'use client';

import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { FlowInstances, useFlowsStore } from '__store/flowsStore';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw } from 'lucide-react';

type Props = {
  state: 'idle' | 'waiting' | 'flower' | 'flowerSmall' | 'flowerMedium' | 'flowerLarge' | 'calendar' | 'sweet' | 'custom';
  flowName: keyof FlowInstances;
};

export default function Floro({ state, flowName }: Props) {
  const { goBack, reset } = useFlowsStore();
  const { rive, RiveComponent } = useRive({
    src: '/floro.riv',
    stateMachines: ['State'],
    autoplay: true
  });

  const inputs = ['Flower', 'FlowerLength', 'Waiting', 'Sweet', 'backTrigger', 'nextTrigger'];
  const [flowerTrigger, flowerLength, waitingTrigger, sweetTrigger, backTrigger, nextTrigger] =
    inputs.map((name) => useStateMachineInput(rive, 'State', name));


  const goBackFlow = () => {
    goBack(flowName); 
    prevAnimation();
  }
  const resetFlow = () => {
    reset(flowName)
  }


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
    flowerLength!.value = size;
  };

  const waitingAction = () => {
    waitingTrigger!.value = !waitingTrigger!.value;
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
          break;
        case 'waiting':
          console.log('WAITINGGGGGGG');
          flowerFlow();
          break;
        case 'flower':
          console.log('FLOWER GOOOOOOOOOOO');
          flowerFlow();
          break;
        case 'flowerSmall':
          console.log('FLOWER GOOOOOOOOOOO');
          flowerSize(0);
          break;
        case 'flowerMedium':
          console.log('FLOWER GOOOOOOOOOOO');
          flowerSize(1);
          break;
        case 'flowerLarge':
          console.log('FLOWER GOOOOOOOOOOO');
          flowerSize(2);
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
    }, [state]); 

  return (
    <div className="w-3/4 h-full z-10 relative m-auto">
        <div className="w-full flex flex-row justify-between z-20 translate-y-3/4">
          <Button variant="ghost" className="rounded-full" onClick={goBackFlow}>
            <ArrowLeft />
          </Button>

          <Button variant="ghost" className="rounded-full" onClick={resetFlow}>
            <RotateCcw />
          </Button>
        </div>
      <RiveComponent />
    </div>
  );
}
