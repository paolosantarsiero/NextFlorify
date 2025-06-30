'use client';

import { Button } from '@/components/ui/button';
import { Flow } from '__flows/_flow';
import { FlowNode } from '__flows/_flowNode';
import { MessageKeys, NamespaceKeys, useTranslations } from 'next-intl';

type ButtonInputProps = {
  node: FlowNode<any, any>;
  onAnswer: (answer: any) => void;
  flowTranslations: Flow['translations'];
};

export const ButtonInput = ({ node, onAnswer, flowTranslations }: ButtonInputProps) => {
  const t = useTranslations(flowTranslations as NamespaceKeys<IntlMessages, 'flows'>);
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {node.answers?.options?.map((opt: string) => (
        <Button
          key={String(opt)}
          variant="secondary"
          className="rounded-md"
          onClick={() => onAnswer({ [node.id]: opt })}
        >
          {t(`answers.${node.id}.${opt}` as MessageKeys<IntlMessages, 'flows'>)}
        </Button>
      ))}
    </div>
  );
};
