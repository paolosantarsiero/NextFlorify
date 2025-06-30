'use client';

import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { useEffect } from 'react';

type Props = {
  state: 'idle' | 'waiting' | 'flower' | 'sweet' | 'custom';
};

export default function Floro({ state }: Props) {
  const { rive, RiveComponent } = useRive({
    src: '/floro.riv',
    stateMachines: ['State'],
    autoplay: true
  });

  const inputs = ['Flower', 'FlowerLength', 'Waiting', 'Sweet', 'backTrigger', 'nextTrigger'];
  const [flowerTrigger, flowerLength, waitingTrigger, sweetTrigger, backTrigger, nextTrigger] =
    inputs.map((name) => useStateMachineInput(rive, 'State', name));





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
          console.log('FLOWER');
          flowerFlow();
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
      <div className="text-center text-sm">{state ?? 'non defined'}</div>
      
      <RiveComponent />
    </div>
  );
}
