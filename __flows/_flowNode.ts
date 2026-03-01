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

/** Nodi che mostrano il pulsante Continua fuori dall’area scrollabile */
export const INPUT_TYPES_WITH_CONTINUE_BUTTON: InputType[] = [
  'buttonMultiSelect',
  'text',
  'date',
  'coordinates'
];

/** Nodi che usano onPendingSubmitChange (valore + validità) invece di submit diretto */
export const INPUT_TYPES_WITH_PENDING_SUBMIT: InputType[] = ['text', 'date', 'coordinates'];

export type PendingSubmitValue = Record<string, unknown> | null;
export type OnPendingSubmitChange = (value: PendingSubmitValue, valid: boolean) => void;
export type PendingSubmitAnswer = { value: Record<string, unknown>; valid: boolean } | null;

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
