'use client';

import { Flow } from '__flows/_flow';
import { FlowNode } from '__flows/_flowNode';
import { MessageKeys, NamespaceKeys, useTranslations } from 'next-intl';

type ButtonInputProps = {
  node: FlowNode<any>;
  onAnswer: (answer: any) => void;
  flowTranslations: Flow['translations'];
};

export const ButtonInput = ({ node, onAnswer, flowTranslations }: ButtonInputProps) => {
  const t = useTranslations(flowTranslations as NamespaceKeys<IntlMessages, 'flows'>);
  return (
    <div className="flex gap-2">
      {node.answers?.options.map((opt: string) => (
        <button
          key={String(opt)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => onAnswer({ [node.id]: opt })}
        >
          {t(`answers.${node.id}.${opt}` as MessageKeys<IntlMessages, 'flows'>)}
        </button>
      ))}
    </div>
  );
};
