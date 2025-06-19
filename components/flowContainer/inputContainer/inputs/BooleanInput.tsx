'use client';

import { FlowNode } from '__flows/_flowNode';

type BooleanInputProps = {
  node: FlowNode<any>;
  onAnswer: (answer: any) => void;
};

export const BooleanInput = ({ node, onAnswer }: BooleanInputProps) => {
  return (
    <div className="flex gap-2">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => onAnswer({ [node.id]: true })}
      >
        Si
      </button>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => onAnswer({ [node.id]: false })}
      >
        No
      </button>
    </div>
  );
};
