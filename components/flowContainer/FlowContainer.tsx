'use client';

import Floro, { FloroRiveState } from '@/components/ui/floro';
import { FlowInstances, useFlowsStore } from '__store/flowsStore';
import { Cloud } from 'assets/images/Cloud';

import { Flow } from '__flows/_flow';
import { MessageKeys, NamespaceKeys, useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { InputContainer } from './inputContainer/InputContainer';

type FlowContainerProps<T> = {
  flowName: keyof FlowInstances;
  onEnd?: (data: T) => void;
};

export const FlowContainer = <T,>({ flowName, onEnd }: FlowContainerProps<T>) => {
  const { flows, setCurrentNodeId, updateData, goBack, reset, getData, start } = useFlowsStore();
  const { currentNodeId, flow } = flows[flowName];
  const currentNode = currentNodeId ? flow.steps[currentNodeId] : null;
  const t = useTranslations(flow.translations as NamespaceKeys<IntlMessages, 'flows'>);

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
      const nextKey = currentNode?.next(answer) as keyof typeof flow.steps | null;
      if (nextKey && flow.steps[nextKey]) {
        setCurrentNodeId(flowName, nextKey);
      } else if (nextKey === 'end') {
        onEnd?.(getData(flowName) as T);
      }
    } catch (error) {
      console.error('Error processing answer:', error);
    }
  };

  useEffect(() => {
    start(flowName);
  }, []);

  return (
    <div className="flex flex-col h-full w-full sm:w-1/2 md:w-1/3  items-center justify-center md:-translate-y-[100px]">
      <div className="flex flex-col h-2/3 w-full justify-end items-center">
        <div className="w-full max-h-[400px] overflow-hidden">
          <Cloud className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0" />
          <Floro
            flowName={flowName}
            state={
              (currentNode?.riveState?.(getData(flowName) as Flow) || 'idle') as FloroRiveState
            }
            navigation={true}
          />
        </div>

        <div className="min-h-20 max-w-[400px] p-6 z-30 -mt-[24px] transition-[max-width] duration-300 ease-in-out text-center items-center justify-center flex shadow-[0_4px_13px_rgba(0,0,0,0.15)] rounded-full bg-background text-md font-bold backdrop-blur-sm text-lg opacity-75">
          {currentNode && t(`questions.${currentNode?.id}` as MessageKeys<IntlMessages, 'flows'>)}
        </div>
      </div>

      <div className="w-full h-1/3 mt-6 z-30">
        {currentNode && (
          <InputContainer
            node={currentNode}
            onAnswer={handleAnswer}
            flowTranslations={flow.translations}
          />
        )}
      </div>
    </div>
  );
};
