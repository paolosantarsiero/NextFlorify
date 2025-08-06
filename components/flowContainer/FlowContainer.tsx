'use client';

import { Flow } from '@/__flows/_flow';
import { useCssAnimationStore } from '@/__store/cssAnimationsStore';
import { FlowInstances, useFlowsStore } from '@/__store/flowsStore';
import { Cloud } from '@/assets/images/Cloud';
import { InputContainer } from '@/components/flowContainer/inputContainer/InputContainer';
import Floro, { FloroRiveState } from '@/components/rive/floro';
import clsx from 'clsx';
import { MessageKeys, NamespaceKeys, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { PendingFlowDialog } from './pendingFlowDialog/PendingFlowDialog';

type FlowContainerProps<T> = {
  flowName: keyof FlowInstances;
  onGoHome?: () => void;
  onEnd?: (data: T) => void;
};

export const FlowContainer = <T,>({ flowName, onEnd, onGoHome }: FlowContainerProps<T>) => {
  const { flows, setCurrentNodeId, updateData, reset, getData, start, getCurrentNode } =
    useFlowsStore();
  const [isPendingFlowDialogOpen, setIsPendingFlowDialogOpen] = useState(false);
  const flow = flows[flowName].flow;
  const currentNode = flows[flowName].currentNodeId
    ? flows[flowName].flow.steps[flows[flowName].currentNodeId]
    : null;

  const tFlow = useTranslations(
    flows[flowName].flow.translations as NamespaceKeys<IntlMessages, 'flows'>
  );
  const { setComponentState } = useCssAnimationStore();

  useEffect(() => {
    start(flowName, (wasAlreadyStarted) => {
      if (wasAlreadyStarted) {
        // @todo: implement pending flow dialog with fix rive handle state
        //setIsPendingFlowDialogOpen(true);
        // @todo: remove force reset to avoid problem with rive state
        reset(flowName);
      }
    });
  }, []);

  const handleAnswer = (answer: any) => {
    if (!currentNode) {
      console.error('No current node found');
      return;
    }

    try {
      const schema = currentNode.schema;
      if (schema) {
        if (schema) {
          const validationResult = schema.safeParse(answer);
          if (!validationResult.success) {
            const errorMessage = validationResult.error.errors.map((e) => e.message).join(', ');
            console.log(JSON.stringify(validationResult, null, 2));
            toast.error(errorMessage);
            return;
          }
          answer = validationResult.data;
        }
      }
      updateData(flowName, answer);
      const nextKey = currentNode?.next(getData(flowName)) as keyof typeof flow.steps | null;
      if (nextKey && flow.steps[nextKey]) {
        setCurrentNodeId(flowName, nextKey);
      } else if (nextKey === 'end') {
        onEnd?.(getData(flowName) as T);
      }
      if (currentNode?.cssAnimations) {
        currentNode.cssAnimations.forEach((cssAnimation) => {
          setComponentState(cssAnimation.component, cssAnimation.state);
        });
      }
    } catch (error) {
      console.error('Error processing answer:', error);
    }
  };

  if (!currentNode) {
    return null;
  }

  return (
    <div className="flex flex-col h-full w-full sm:max-w-[500px] items-center justify-start z-10">
      <div className="flex flex-col w-full justify-start items-center mt-[80px]">
        <div className="w-full max-h-[360px] md:h-[316px] overflow-hidden relative">
          <Cloud className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-12 z-0" />
          <Floro
            flowName={flowName}
            state={
              (currentNode?.riveState?.(getData(flowName) as Flow) || 'idle') as FloroRiveState
            }
            navigation={true}
            onGoHome={onGoHome} // TODO: remove this
          />
        </div>
        <div className="backdrop-blur-md min-h-20 max-w-[400px] p-6 z-30 -mt-[24px] mx-4 hover:scale-110 transition-transform duration-300 ease-in-out text-center items-center justify-center flex shadow-[0_4px_13px_rgba(0,0,0,0.15)] rounded-full bg-background/70 text-md font-bold text-lg">
          {currentNode &&
            tFlow(`questions.${currentNode?.id}` as MessageKeys<IntlMessages, 'flows'>)}
        </div>
      </div>

      <div className="relative w-full bg-white min-h-[5rem] max-h-[9rem] mt-3">
        {/* gradient blur top */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-white to-transparent z-10" />

        {/* gradient blur bottom */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent z-10" />

        {/* scrollable content */}
        <div
          className={clsx('h-full py-2 px-3 pt-4', {
            'overflow-y-auto scrollbar-hide': currentNode.inputType !== 'coordinates'
          })}
        >
          {currentNode && (
            <InputContainer
              node={currentNode}
              onAnswerAction={handleAnswer}
              flowTranslations={flow.translations}
            />
          )}
        </div>
      </div>
      <PendingFlowDialog
        flowTranslations={flow.translations as NamespaceKeys<IntlMessages, 'flows'>}
        onStartAction={() => start(flowName)}
        onResetAction={() => reset(flowName)}
        open={isPendingFlowDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsPendingFlowDialogOpen(false);
          }
        }}
        onClose={() => setIsPendingFlowDialogOpen(false)}
      />
    </div>
  );
};
