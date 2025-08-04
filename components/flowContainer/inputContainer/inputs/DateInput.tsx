'use client';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/datePicker';
import { formatDateToDDMMYYYY } from '@/lib/utils';
import { FlowNode } from '__flows/_flowNode';
import { addYears } from 'date-fns';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

type DateInputProps = {
  node: FlowNode<any, any>;
  onAnswerAction: (answer: any) => void;
};

export const DateInput = ({ node, onAnswerAction }: DateInputProps) => {
  const tShared = useTranslations('flows.shared');
  const [value, setValue] = useState<Date | undefined>(undefined);
  const [schemaStatus, setSchemaStatus] = useState<boolean>(false);

  useEffect(() => {
    const schema = node.schema;
    if (schema && value) {
      const validationResult = schema.safeParse({ [node.id]: formatDateToDDMMYYYY(value) });
      setSchemaStatus(validationResult.success);
    }
  }, [value]);

  return (
    <div className="flex gap-2 items-center w-full">
      <DatePicker
        onSelect={(date) => setValue(date)}
        minDate={new Date()}
        maxDate={addYears(new Date(), 1)}
      />
      <Button
        type="submit"
        variant="ghost"
        className="absolute bottom-0 right-0 rounded-full z-50 translate-y-10"
        disabled={!schemaStatus}
        onClick={() => onAnswerAction({ [node.id]: formatDateToDDMMYYYY(value || new Date()) })}
      >
        {tShared('submit')}
      </Button>
    </div>
  );
};
