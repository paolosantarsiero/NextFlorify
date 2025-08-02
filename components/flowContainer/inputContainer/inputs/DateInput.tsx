'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FlowNode } from '__flows/_flowNode';
import { useState } from 'react';

type DateInputProps = {
  node: FlowNode<any, any>;
  onAnswerAction: (answer: any) => void;
};

export const DateInput = ({ node, onAnswerAction }: DateInputProps) => {
  const [value, setValue] = useState('');
  return (
    <div className="flex gap-2 items-center w-full">
      <Input
        type="date"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        min={new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]} // Prevent past dates
        max={
          new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
        } // add 1 year limit
        className="border px-2 py-1 rounded-md"
      />
      <Button
        variant="secondary"
        className="rounded-md"
        disabled={!value}
        onClick={() => onAnswerAction({ [node.id]: value })}
      >
        Conferma
      </Button>
    </div>
  );
};
