import { Resolver } from 'react-hook-form';

import { FieldValues } from 'react-hook-form';
import { ZodEnum } from 'zod';

export type InputType = 'text' | 'buttonSelect' | 'buttonMultiSelect' | 'date' | 'boolean';

export type FlowNode<T extends FieldValues, D extends FieldValues> = {
  id: string;
  answers?: ZodEnum<any>;
  component?: React.FC;
  cssAnimations?: {
    component: string;
    state: string;
  }[];
  riveState?: (data: D) => string;
  resolver: Resolver<T>;
  next: (flowData: D) => string | null;
  inputType: InputType;
};
