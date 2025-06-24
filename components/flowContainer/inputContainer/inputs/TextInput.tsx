'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FlowNode } from '__flows/_flowNode';
import { useState } from 'react';

type TextInputProps = {
  node: FlowNode<any>;
  onAnswer: (answer: any) => void;
};

export const TextInput = ({ node, onAnswer }: TextInputProps) => {
  const [value, setValue] = useState('');
  return (
    <div className="flex gap-2 items-center w-full">
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border px-2 py-1 rounded-md"
      />
      <Button
        variant="secondary"
        className="rounded-md"
        onClick={() => onAnswer({ [node.id]: value })}
      >
        Conferma
      </Button>
    </div>
  );
};
