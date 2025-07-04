'use client';

import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { ReactElement } from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  children: (field: FieldValues) => ReactElement;
  className?: string;
  label?: string;
  isLoading?: boolean;
};

export type FormFieldWrapperProps = {
  name: string;
  wrapperClassName?: string;
  label?: string;
  isLoading?: boolean;
};

export default function FormFieldWrapper({ name, children, className, label, isLoading }: Props) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col', className)}>
          {label && <Label>{label}</Label>}
          <FormControl>{children(field)}</FormControl>
          {!isLoading && <FormMessage />}
        </FormItem>
      )}
    />
  );
}
