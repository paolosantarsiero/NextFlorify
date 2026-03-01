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
  | 'watchingHome'
  | 'flower'
  | 'flowerSmall'
  | 'flowerMedium'
  | 'flowerLarge'
  | 'plant'
  | 'romantic'
  | 'recurrence'
  | 'color'
  | 'style'
  | 'perfume'
  | 'shipping'
  | 'packaging'
  | 'calendar'
  | 'calendarDay'
  | 'sweet'
  | 'lookingDown'
  | 'custom'
  | 'surprise'
  | 'next';

type Props = {
  state: FloroRiveState;
  flowName: keyof FlowInstances;
  navigation: boolean;
  className?: string;
  onGoHome?: () => void;
  replayFromHistory?: boolean;
  onReplayComplete?: () => void;
};

export default function Floro({
  state,
  flowName,
  navigation,
  onGoHome,
  className,
  replayFromHistory,
  onReplayComplete
}: Props) {
  const { goBack, reset, getData, getCurrentNodeId, getFlow, flows } = useFlowsStore();
  const { rive, RiveComponent } = useRive({
    src: '/floro.riv',
    stateMachines: ['State'],
    autoplay: true
  });

  const inputs = [
    'Flower',
    'FlowerLength',
    'Plant',
    'Calendar',
    'CalendarDay',
    'Romantic',
    'Recurrence',
    'Color',
    'Style',
    'Perfume',
    'Shipping',
    'Watching',
    'WatchingHome',
    'Sweet',
    'LookingDown',
    'backTrigger',
    'nextTrigger'
  ];
  const [
    flowerTrigger,
    flowerLength,
    plantTrigger,
    calendarTrigger,
    calendarDayTrigger,
    romanticTrigger,
    recurrenceTrigger,
    colorTrigger,
    styleTrigger,
    perfumeTrigger,
    shippingTrigger,
    watchingTrigger,
    watchingHomeTrigger,
    sweetTrigger,
    lookingDownTrigger,
    backTrigger,
    nextTrigger
  ] = inputs.map((name) => useStateMachineInput(rive, 'State', name));

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
    plantTrigger?.fire();
  };

  const romanticFlow = () => {
    romanticTrigger?.fire();
  };

  const recurrenceAction = () => {
    recurrenceTrigger?.fire();
  };

  const colorAction = () => {
    colorTrigger?.fire();
  };

  const styleAction = () => {
    styleTrigger?.fire();
  };

  const perfumeAction = () => {
    perfumeTrigger?.fire();
  };

  const shippingAction = () => {
    shippingTrigger?.fire();
  };

  const flowerSize = (size: number | boolean) => {
    if (flowerLength) {
      flowerLength.value = size;
    }
  };

  const calendar = () => {
    calendarTrigger?.fire();
  };

  const calendarDayAction = () => {
    calendarDayTrigger?.fire();
  };

  const watchingAction = () => {
    watchingTrigger?.fire();
  };

  const watchingHomeAction = () => {
    watchingHomeTrigger?.fire();
  };

  const lookingDownAction = () => {
    lookingDownTrigger?.fire();
  };

  const sweetAction = () => {
    sweetTrigger!.value = !sweetTrigger!.value;
  };

  const switchAnimation = (animationName: string | string[] | undefined) => {
    rive?.play(animationName); // cambia animazione
  };

  const applyState = (targetState: FloroRiveState) => {
    switch (targetState) {
      case 'idle':
        watchingTrigger?.fire();
        break;
      case 'watching':
        watchingAction();
        break;
      case 'watchingHome':
        watchingHomeAction();
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
      case 'plant':
        plantFlow();
        break;
      case 'romantic':
        romanticFlow();
        break;
      case 'recurrence':
        recurrenceAction();
        break;
      case 'color':
        colorAction();
        break;
      case 'style':
        styleAction();
        break;
      case 'perfume':
        perfumeAction();
        break;
      case 'shipping':
        shippingAction();
        break;
      case 'surprise':
      case 'next':
      case 'packaging':
        nextAnimation();
        break;
      case 'calendar':
        calendar();
        break;
      case 'calendarDay':
        calendarDayAction();
        break;
      case 'lookingDown':
        lookingDownAction();
        break;
      case 'sweet':
        break;
      case 'custom':
        break;
    }
  };

  useEffect(() => {
    if (replayFromHistory) return;
    applyState(state);
  }, [
    state,
    replayFromHistory,
    flowerTrigger,
    flowerLength,
    plantTrigger,
    calendarTrigger,
    calendarDayTrigger,
    romanticTrigger,
    recurrenceTrigger,
    colorTrigger,
    styleTrigger,
    perfumeTrigger,
    shippingTrigger,
    watchingTrigger,
    watchingHomeTrigger,
    sweetTrigger,
    lookingDownTrigger,
    backTrigger,
    nextTrigger
  ]);

  useEffect(() => {
    if (!replayFromHistory) return;

    const flowDef = getFlow(flowName);
    const currentNodeId = getCurrentNodeId(flowName);
    const flowInstance = flows[flowName];

    if (!flowDef || !currentNodeId || !flowInstance) {
      onReplayComplete?.();
      return;
    }

    const nodeIds = [...flowInstance.history, currentNodeId].filter(
      (id): id is string => typeof id === 'string' && Boolean(flowDef.steps[id])
    );

    if (!nodeIds.length) {
      onReplayComplete?.();
      return;
    }

    const data = getData(flowName);
    const STEP_MS = 400;
    let index = 0;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const step = () => {
      const id = nodeIds.at(index);
      const node = id !== undefined ? flowDef.steps[id] : undefined;
      const riveState = node?.riveState?.(data as never) as FloroRiveState | undefined;
      if (riveState) applyState(riveState);

      index += 1;
      if (index < nodeIds.length) {
        timeoutId = setTimeout(step, STEP_MS);
      } else {
        onReplayComplete?.();
      }
    };

    timeoutId = setTimeout(step, 350);

    return () => {
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, [replayFromHistory]);

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
