'use client';
import { FlowNode } from '__flows/_flowNode';
import { useState } from 'react';

type DateInputProps = {
  node: FlowNode<any>;
  onAnswer: (answer: any) => void;
};

export const DateInput = ({ node, onAnswer }: DateInputProps) => {
  const [value, setValue] = useState('');
  return (
    <div className="flex gap-2 items-center">
      <input
        type="date"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border px-2 py-1 rounded"
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        disabled={!value}
        onClick={() => onAnswer({ [node.id]: value })}
      >
        Conferma
      </button>
    </div>
  );
};
