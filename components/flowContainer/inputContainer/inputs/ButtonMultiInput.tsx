'use client';

import { Toggle } from '@/components/ui/toggle';
import { Flow } from '__flows/_flow';
import { FlowNode } from '__flows/_flowNode';
import { MessageKeys, NamespaceKeys, useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

type ButtonMultiInputProps = {
  node: FlowNode<any, any>;
  onAnswerAction: (answer: any) => void;
  flowTranslations: Flow['translations'];
  initialValue?: string[];
};

export const ButtonMultiInput = ({
  node,
  onAnswerAction,
  initialValue,
  flowTranslations
}: ButtonMultiInputProps) => {
  const t = useTranslations(flowTranslations as NamespaceKeys<IntlMessages, 'flows'>);
  const [selected, setSelected] = useState<string[]>(initialValue || []);
  const onAnswerActionRef = useRef(onAnswerAction);
  onAnswerActionRef.current = onAnswerAction;

  useEffect(() => {
    const nextSelected = initialValue || [];
    setSelected(nextSelected);
    if (nextSelected.length > 0) {
      onAnswerActionRef.current({ [node.id]: nextSelected });
    }
  }, [initialValue, node.id]);

  const toggleOption = (option: string) => {
    const next = selected.includes(option)
      ? selected.filter((o) => o !== option)
      : [...selected, option];
    setSelected(next);
    onAnswerAction({ [node.id]: next });
  };

  return (
    <div className="flex flex-wrap gap-6 gap-y-4 justify-center">
      {node.answers?.options?.map((opt: string) => (
        <Toggle
          key={`${node.id}-${opt}`}
          variant="outline"
          className="rounded-xl bg-background px-5 py-3"
          pressed={selected.includes(opt)}
          onClick={() => toggleOption(opt)}
        >
          {t(`answers.${node.id}.${opt}` as MessageKeys<IntlMessages, 'flows'>)}
        </Toggle>
      ))}
    </div>
  );
};
