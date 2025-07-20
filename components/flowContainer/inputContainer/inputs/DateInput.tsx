'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FlowNode } from '__flows/_flowNode';
import { useState } from 'react';

type DateInputProps = {
  node: FlowNode<any, any>;
  onAnswer: (answer: any) => void;
};

export const DateInput = ({ node, onAnswer }: DateInputProps) => {
  const [value, setValue] = useState('');
  return (
    <div className="flex gap-2 items-center w-full">
      <Input
        type="date"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        min={new Date().toISOString().split('T')[0]} // Prevent past dates
        className="border px-2 py-1 rounded-md"
      />
      <Button
        variant="secondary"
        className="rounded-md"
        disabled={!value}
        onClick={() => onAnswer({ [node.id]: value })}
      >
        Conferma
      </Button>
    </div>
  );
};
