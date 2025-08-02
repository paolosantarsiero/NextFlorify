'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FlowNode } from '__flows/_flowNode';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

type TextInputProps = {
  node: FlowNode<any, any>;
  onAnswerAction: (answer: any) => void;
};

export const TextInput = ({ node, onAnswerAction }: TextInputProps) => {
  const tShared = useTranslations('flows.shared');
  const [value, setValue] = useState('');
  const [schemaStatus, setSchemaStatus] = useState<boolean>(false);

  useEffect(() => {
    const schema = node.schema;
    if (schema) {
      const validationResult = schema.safeParse({ [node.id]: value });
      setSchemaStatus(validationResult.success);
    }
  }, [value]);

  return (
    <div className="flex gap-2 items-center w-full">
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={3}
        className="py-4 px-4 resize-none"
        placeholder={tShared('writeHere')}
      />
      <Button
        type="submit"
        variant="ghost"
        className="absolute bottom-0 right-0 rounded-full z-50 translate-y-10"
        disabled={!schemaStatus}
        onClick={() => onAnswerAction({ [node.id]: value })}
      >
        {tShared('submit')}
      </Button>
    </div>
  );
};
