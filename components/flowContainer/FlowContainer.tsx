'use client';

import { Button } from '@/components/ui/button';
import Floro from '@/components/ui/floro';
import { SubscriptionFlowDataType } from '__flows/subscription/subscriptionQuestionsSchema';
import { FlowInstances, useFlowsStore } from '__store/flowsStore';
import { Cloud } from 'assets/images/Cloud';
import { Fioraio } from 'assets/images/fioraio_1';
import LoadingDataScreen from 'components/DataFetching/LoadingDataScreen';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { MessageKeys, NamespaceKeys, useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { InputContainer } from './inputContainer/InputContainer';

type FlowContainerProps<T> = {
  flowName: keyof FlowInstances;
  isLoading?: boolean;
  onEnd?: (data: T) => void;
};

export const FlowContainer = <T,>({ flowName, isLoading, onEnd }: FlowContainerProps<T>) => {
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
    <div className="flex flex-col h-full w-full sm:w-1/2 md:w-1/3  items-center justify-center">
      <div className="flex flex-col h-2/3 w-full justify-end items-center">
        <div className="w-full flex flex-row justify-between z-20">
          <Button variant="ghost" className="rounded-full" onClick={() => goBack(flowName)}>
            <ArrowLeft />
          </Button>
          <Button variant="ghost" className="rounded-full" onClick={() => reset(flowName)}>
            <RotateCcw />
          </Button>
        </div>

        <div className="w-full h-2/4">
          <Cloud className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0" />
          <Floro state={currentNode?.riveState?.(getData(flowName) as SubscriptionFlowDataType)} />
        </div>

        <div className="h-20 w-3/4 z-30 -mt-[44px] text-center items-center justify-center flex shadow-[0_4px_13px_rgba(0,0,0,0.15)] rounded-full bg-background text-md font-bold backdrop-blur-sm text-lg opacity-75">
          {currentNode && t(`questions.${currentNode?.id}` as MessageKeys<IntlMessages, 'flows'>)}
        </div>
      </div>
      <div className="w-full h-1/3 -translate-y-12">
        {isLoading && <LoadingDataScreen />}
        {currentNode && !isLoading && (
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
