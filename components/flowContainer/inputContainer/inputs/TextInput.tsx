'use client';

import { FlowNode } from '__flows/_flowNode';
import { useState } from 'react';

type TextInputProps = {
  node: FlowNode<any>;
  onAnswer: (answer: any) => void;
};

export const TextInput = ({ node, onAnswer }: TextInputProps) => {
  const [value, setValue] = useState('');
  return (
    <div className="flex gap-2 items-center">
      <input
        type="text"
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
