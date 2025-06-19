import { Resolver } from 'react-hook-form';

import { FieldValues } from 'react-hook-form';
import { ZodEnum } from 'zod';

export type InputType = 'text' | 'buttonSelect' | 'date' | 'boolean';

export type FlowNode<T extends FieldValues> = {
  id: string;
  answers?: ZodEnum<any>;
  component?: React.FC;
  resolver: Resolver<T>;
  next: (data: T) => string | null;
  inputType: InputType;
};
