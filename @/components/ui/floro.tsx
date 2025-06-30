'use client';

import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

type Props = {
  state?: string;
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

  return (
    <div className="w-3/4 h-full z-10 relative m-auto">
      <div className="text-center text-sm">{state ?? 'non defined'}</div>
      <div className="w-full -top-[150px] absolute flex flex-wrap justify-between">
        <button className="z-20 border p-2" onClick={prevAnimation}>
          Back
        </button>
        <button className="z-20 border p-2" onClick={nextAnimation}>
          Next
        </button>
        <button className="z-20 border p-2" onClick={flowerFlow}>
          Flower
        </button>
        <button className="z-20 border p-2" onClick={() => flowerSize(1)}>
          Fl M
        </button>
        <button className="z-20 border p-2" onClick={() => flowerSize(2)}>
          Fl L
        </button>
        <button className="z-20 border p-2" onClick={waitingAction}>
          Waiting
        </button>
        <button className="z-20 border p-2" onClick={sweetAction}>
          Sweet
        </button>
        <button className="z-20 border p-2" onClick={() => switchAnimation('MAINpnpm')}>
          Switch
        </button>
      </div>

      <RiveComponent />
    </div>
  );
}
