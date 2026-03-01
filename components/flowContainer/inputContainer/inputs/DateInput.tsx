'use client';
import { DatePicker } from '@/components/ui/datePicker';
import { formatDateToDDMMYYYY } from '@/lib/utils';
import { FlowNode, type OnPendingSubmitChange } from '__flows/_flowNode';
import { addYears } from 'date-fns';
import { useEffect, useState } from 'react';

type DateInputProps = {
  node: FlowNode<any, any>;
  onAnswerAction: (answer: any) => void;
  onPendingSubmitChange?: OnPendingSubmitChange;
};

export const DateInput = ({ node, onAnswerAction, onPendingSubmitChange }: DateInputProps) => {
  const [value, setValue] = useState<Date | undefined>(undefined);
  const [schemaStatus, setSchemaStatus] = useState<boolean>(false);

  useEffect(() => {
    const schema = node.schema;
    if (schema && value) {
      const validationResult = schema.safeParse({ [node.id]: formatDateToDDMMYYYY(value) });
      setSchemaStatus(validationResult.success);
    }
  }, [node, value]);

  useEffect(() => {
    const payload = value !== undefined ? { [node.id]: formatDateToDDMMYYYY(value) } : null;
    onPendingSubmitChange?.(payload, schemaStatus);
  }, [node.id, value, schemaStatus, onPendingSubmitChange]);

  return (
    <div className="flex flex-col gap-3 w-full max-w-[300px] mx-auto">
      <DatePicker onSelect={(date) => setValue(date)} maxDate={addYears(new Date(), 1)} />
    </div>
  );
};
