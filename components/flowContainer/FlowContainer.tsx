'use client';

import { Button } from '@/components/ui/button';
import { FlowInstances, useFlowsStore } from '__store/flowsStore';
import { Cloud } from 'assets/images/Cloud';
import { Fioraio } from 'assets/images/fioraio_1';
import { ArrowLeft, RotateCcw } from 'lucide-react';
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
    <div className="flex flex-col h-full sm:w-1/2 md:w-1/3  items-center justify-center">
      <div className="flex flex-col h-2/3 w-full justify-end">
        <div className="w-full flex flex-row justify-between z-20">
          <Button variant="ghost" className="rounded-full" onClick={() => goBack(flowName)}>
            <ArrowLeft />
          </Button>
          <Button variant="ghost" className="rounded-full" onClick={() => reset(flowName)}>
            <RotateCcw />
          </Button>
        </div>
        <div className="grid place-items-center -translate-y-10">
          <div className="col-start-1 row-start-1 z-10 ">
            <Cloud className="" />
          </div>
          <div className="col-start-1 row-start-1 z-20">
            <Fioraio className="" />
          </div>
        </div>
        <div className="h-16 w-full z-30 -translate-y-20 text-center items-center justify-center flex shadow-md rounded-full bg-background text-md font-bold ">
          {currentNode && t(`questions.${currentNode?.id}` as MessageKeys<IntlMessages, 'flows'>)}
        </div>
      </div>
      <div className="w-full h-1/3 -translate-y-12">
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
