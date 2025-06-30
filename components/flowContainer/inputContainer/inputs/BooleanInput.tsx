'use client';

import { Button } from '@/components/ui/button';
import { FlowNode } from '__flows/_flowNode';

type BooleanInputProps = {
  node: FlowNode<any, any>;
  onAnswer: (answer: any) => void;
};

export const BooleanInput = ({ node, onAnswer }: BooleanInputProps) => {
  return (
    <div className="flex gap-2 w-full justify-center">
      <Button
        variant="secondary"
        className="rounded-md"
        onClick={() => onAnswer({ [node.id]: true })}
      >
        Si
      </Button>
      <Button
        variant="secondary"
        className="rounded-md"
        onClick={() => onAnswer({ [node.id]: false })}
      >
        No
      </Button>
    </div>
  );
};
