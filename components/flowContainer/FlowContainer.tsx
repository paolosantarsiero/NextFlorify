'use client';

import { Flow } from '__flows/_flow';
import { MessageKeys, NamespaceKeys, useTranslations } from 'next-intl';
import { useState } from 'react';
import { InputContainer } from './inputContainer/InputContainer';

type FlowContainerProps = {
  flow: Flow;
  startNodeKey: keyof Flow;
};

export const FlowContainer = ({ flow, startNodeKey }: FlowContainerProps) => {
  const [currentNodeKey, setCurrentNodeKey] = useState<keyof Flow>(startNodeKey);
  const currentNode = flow.steps[currentNodeKey];
  const t = useTranslations(flow.translations as NamespaceKeys<IntlMessages, 'flows'>);

  const handleAnswer = (answer: any) => {
    const nextKey = currentNode?.next(answer) as keyof Flow | null;
    if (nextKey && flow.steps[nextKey]) {
      setCurrentNodeKey(nextKey);
    } else {
      // Fine del flow o nodo non trovato
      alert('Fine del questionario!');
    }
  };

  return (
    <div className="flex flex-col">
      <div className="w-full">
        <button onClick={() => setCurrentNodeKey(startNodeKey)}>Back</button>
      </div>
      <div className="h-[300px] w-full bg-red-500">qui ci va l'immagine</div>
      <div className="w-full">
        {t(`questions.${currentNode?.id}` as MessageKeys<IntlMessages, 'flows'>)}
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
