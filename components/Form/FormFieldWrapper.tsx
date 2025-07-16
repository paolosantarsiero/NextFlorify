'use client';

import FieldWrapper, { FieldWrapperProps } from '@/components/FieldWrapper';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { ReactElement } from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';

export type FormFieldWrapperProps = {
  name: string;
  children?: (field: FieldValues) => ReactElement;
} & Omit<FieldWrapperProps, 'children'>;

export default function FormFieldWrapper({
  name,
  children,
  ...wrapperProps
}: FormFieldWrapperProps) {
  const formContext = useFormContext();

  if (!formContext?.control) {
    return null;
  }

  return (
    <FormField
      control={formContext.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FieldWrapper {...wrapperProps} message={<FormMessage />}>
            {children && (<FormControl>{children(field)}</FormControl>)}
          </FieldWrapper>
        </FormItem>
      )}
    />
  );
}
