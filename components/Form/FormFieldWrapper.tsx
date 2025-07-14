'use client';

import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { ReactElement } from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';

const formFieldWrapperVariants = cva('flex flex-col', {
  variants: {
    variant: {
      clean: '',
      outline: 'border border-gray-200 rounded-lg py-3 px-4'
    }
  },
  defaultVariants: {
    variant: 'outline'
  }
});

type Props = {
  name: string;
  children: (field: FieldValues) => ReactElement;
  className?: string;
  label?: string;
  isLoading?: boolean;
  decorator?: React.ReactNode;
} & VariantProps<typeof formFieldWrapperVariants>;

export type FormFieldWrapperProps = {
  name: string;
  wrapperClassName?: string;
  label?: string;
  isLoading?: boolean;
  decorator?: React.ReactNode;
} & VariantProps<typeof formFieldWrapperVariants>;

export default function FormFieldWrapper({
  name,
  children,
  className,
  label,
  isLoading,
  variant,
  decorator
}: Props) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(formFieldWrapperVariants({ variant }), className)}>
          {label && <Label>{label}</Label>}
          <div className="flex flex-row items-center">
            <FormControl>{children(field)}</FormControl>
            {decorator}
          </div>
          {!isLoading && <FormMessage />}
        </FormItem>
      )}
    />
  );
}
