'use client';

import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { Flow } from '__flows/_flow';
import { FlowNode } from '__flows/_flowNode';
import { Check } from 'lucide-react';
import { MessageKeys, NamespaceKeys, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

type ButtonMultiInputProps = {
  node: FlowNode<any, any>;
  onAnswerAction: (answer: any) => void;
  flowTranslations: Flow['translations'];
};

export const ButtonMultiInput = ({
  node,
  onAnswerAction,
  flowTranslations
}: ButtonMultiInputProps) => {
  const t = useTranslations(flowTranslations as NamespaceKeys<IntlMessages, 'flows'>);
  const [selected, setSelected] = useState<string[]>([]);
  const [schemaStatus, setSchemaStatus] = useState<boolean>(false);

  useEffect(() => {
    const schema = node.schema;
    if (schema) {
      const validationResult = schema.safeParse({ [node.id]: selected });
      setSchemaStatus(validationResult.success);
    }
  }, [selected]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-6 gap-y-4 justify-center">
        {node.answers?.options?.map((opt: string) => (
          <Toggle
            key={`${node.id}-${opt}`}
            variant="outline"
            className="rounded-xl bg-background px-5 py-3"
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
      <Button
        variant="ghost"
        onClick={() => {
          onAnswerAction({ [node.id]: selected });
          setSelected([]);
        }}
        disabled={!schemaStatus}
        className="absolute bottom-0 right-0 rounded-full z-50 translate-y-10"
      >
        {t(`node-specific.${node.id}.submit` as MessageKeys<IntlMessages, 'flows'>)}
        <Check className="w-5 h-5" width={20} height={20} strokeWidth={3} />
      </Button>
    </div>
  );
};
