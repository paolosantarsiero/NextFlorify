import { Resolver } from 'react-hook-form';

import { FieldValues } from 'react-hook-form';

export type InputType = 'text' | 'buttonSelect' | 'date' | 'boolean';

export type FlowNode<T extends FieldValues> = {
  id: string;
  component?: React.FC;
  resolver: Resolver<T>;
  next: (data: T) => string | null;
  inputType: InputType;
};
