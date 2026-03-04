'use client';

import { Textarea } from '@/components/ui/textarea';
import { FlowNode, type OnPendingSubmitChange } from '__flows/_flowNode';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

type TextInputProps = {
  node: FlowNode<any, any>;
  onAnswerAction: (answer: any) => void;
  onPendingSubmitChange?: OnPendingSubmitChange;
  initialValue?: string;
};

export const TextInput = ({
  node,
  onAnswerAction,
  onPendingSubmitChange,
  initialValue
}: TextInputProps) => {
  const tShared = useTranslations('flows.shared');
  const [value, setValue] = useState(initialValue || '');
  const [schemaStatus, setSchemaStatus] = useState<boolean>(false);

  useEffect(() => {
    const schema = node.schema;
    if (schema) {
      const validationResult = schema.safeParse({ [node.id]: value });
      setSchemaStatus(validationResult.success);
    }
  }, [node, value]);

  useEffect(() => {
    onPendingSubmitChange?.({ [node.id]: value }, schemaStatus);
  }, [node.id, value, schemaStatus, onPendingSubmitChange]);

  return (
    <div className="flex flex-col gap-3 w-full max-w-[400px] mx-auto">
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={3}
        className="py-4 px-4 resize-none"
        placeholder={tShared('notes')}
      />
    </div>
  );
};
