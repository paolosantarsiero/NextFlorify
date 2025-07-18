'use client';

import { Flow } from '@/__flows/_flow';
import { useCssAnimationStore } from '@/__store/cssAnimationsStore';
import { FlowInstances, useFlowsStore } from '@/__store/flowsStore';
import { Cloud } from '@/assets/images/Cloud';
import { InputContainer } from '@/components/flowContainer/inputContainer/InputContainer';
import Floro, { FloroRiveState } from '@/components/rive/floro';
import { MessageKeys, NamespaceKeys, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { PendingFlowDialog } from './pendingFlowDialog/PendongFlowDialog';

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
        setIsPendingFlowDialogOpen(true);
      }
    });
  }, []);

  const handleAnswer = (answer: any) => {
    if (!currentNode) {
      console.error('No current node found');
      return;
    }

    try {
      const resolver = currentNode.resolver;
      if (resolver && typeof resolver === 'function') {
        const schema = (resolver as any).schema;
        if (schema) {
          const validationResult = schema.safeParse(answer);
          if (!validationResult.success) {
            console.error('Validation failed:', validationResult.error);
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
    <div className="flex flex-col h-full w-full sm:max-w-[500px]  items-center justify-center -translate-y-[100px] z-10">
      <div className="flex flex-col h-2/3 w-full justify-end items-center">
        <div className="w-full max-h-[360px] md:h-[340px] overflow-hidden">
          <Cloud className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0" />
          <Floro
            flowName={flowName}
            state={
              (currentNode?.riveState?.(getData(flowName) as Flow) || 'idle') as FloroRiveState
            }
            navigation={true}
            onGoHome={onGoHome} // TODO: remove this
          />
        </div>

        <div className="min-h-20 max-w-[400px] p-6 z-30 -mt-[24px] hover:scale-110 transition-transform duration-300 ease-in-out text-center items-center justify-center flex shadow-[0_4px_13px_rgba(0,0,0,0.15)] rounded-full bg-background text-md font-bold backdrop-blur-sm text-lg opacity-75">
          {currentNode &&
            tFlow(`questions.${currentNode?.id}` as MessageKeys<IntlMessages, 'flows'>)}
        </div>
      </div>

      <div className="w-full h-1/3 mt-6">
        {currentNode && (
          <InputContainer
            node={currentNode}
            onAnswer={handleAnswer}
            flowTranslations={flow.translations}
          />
        )}
      </div>
      <PendingFlowDialog
        flowTranslations={flow.translations as NamespaceKeys<IntlMessages, 'flows'>}
        onStart={() => start(flowName)}
        onReset={() => reset(flowName)}
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
