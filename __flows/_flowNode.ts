import { FloroRiveState } from '@/components/rive/floro';

import { FieldValues } from 'react-hook-form';
import { ZodEnum, ZodSchema } from 'zod';

export type InputType =
  | 'text'
  | 'buttonSelect'
  | 'buttonMultiSelect'
  | 'date'
  | 'boolean'
  | 'coordinates';

export type FlowNode<T extends FieldValues, D extends FieldValues> = {
  id: string;
  answers?: ZodEnum<any>;
  component?: React.FC;
  cssAnimations?: {
    component: string;
    state: string;
  }[];
  riveState?: (data: D) => FloroRiveState;
  schema: ZodSchema<T>;
  next: (flowData: D) => string | null;
  inputType: InputType;
  skipHistory?: boolean;
};
