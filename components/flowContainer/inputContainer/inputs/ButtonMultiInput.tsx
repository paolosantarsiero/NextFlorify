'use client';

import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { Flow } from '__flows/_flow';
import { FlowNode } from '__flows/_flowNode';
import { MessageKeys, NamespaceKeys, useTranslations } from 'next-intl';
import { useState } from 'react';

type ButtonMultiInputProps = {
  node: FlowNode<any, any>;
  onAnswer: (answer: any) => void;
  flowTranslations: Flow['translations'];
};

export const ButtonMultiInput = ({ node, onAnswer, flowTranslations }: ButtonMultiInputProps) => {
  const t = useTranslations(flowTranslations as NamespaceKeys<IntlMessages, 'flows'>);
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2 justify-center">
        {node.answers?.options?.map((opt: string) => (
          <Toggle
            key={String(opt)}
            variant="outline"
            className="rounded-md"
            onClick={() =>
              setSelected((prev) =>
                prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
              )
            }
          >
            {t(`answers.${node.id}.${opt}` as MessageKeys<IntlMessages, 'flows'>)}
          </Toggle>
        ))}
      </div>
      <Button variant="gradient" onClick={() => onAnswer({ [node.id]: selected })}>
        {t(`node-specific.${node.id}.submit` as MessageKeys<IntlMessages, 'flows'>)}
      </Button>
    </div>
  );
};
