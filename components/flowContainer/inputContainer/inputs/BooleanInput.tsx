'use client';

import { Button } from '@/components/ui/button';
import { FlowNode } from '__flows/_flowNode';

type BooleanInputProps = {
  node: FlowNode<any, any>;
  onAnswer: (answer: any) => void;
};

export const BooleanInput = ({ node, onAnswer }: BooleanInputProps) => {
  return (
    <div className="flex gap-6 w-full justify-center">
      <Button
        variant="secondary"
        className="rounded-xl font-light px-8 py-3"
        onClick={() => onAnswer({ [node.id]: true })}
      >
        Si
      </Button>
      <Button
        variant="secondary"
        className="rounded-xl font-light px-8 py-3"
        onClick={() => onAnswer({ [node.id]: false })}
      >
        No
      </Button>
    </div>
  );
};
