'use client';

import { FlowInstances, useFlowsStore } from '__store/flowsStore';
import { MessageKeys, NamespaceKeys, useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { InputContainer } from './inputContainer/InputContainer';

type FlowContainerProps = {
  flowName: keyof FlowInstances;
};

export const FlowContainer = ({ flowName }: FlowContainerProps) => {
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
        console.log(getData(flowName));
      }
    } catch (error) {
      console.error('Error processing answer:', error);
    }
  };

  useEffect(() => {
    start(flowName);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="w-full">
        <button onClick={() => goBack(flowName)}>Back</button>
        <button onClick={() => reset(flowName)}>Reset</button>
        <button onClick={() => start(flowName)}>Start</button>
      </div>
      <div className="h-[300px] w-full bg-red-500">qui ci va l'immagine</div>
      <div className="w-full">
        {currentNode && t(`questions.${currentNode?.id}` as MessageKeys<IntlMessages, 'flows'>)}
      </div>
      <div className="w-full">
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
