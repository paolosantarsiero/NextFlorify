'use client';

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

const fieldWrapperVariants = cva('flex flex-col', {
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

export type FieldWrapperProps = {
  label?: string;
  decorator?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  children: React.ReactNode;
  message?: React.ReactNode;
} & VariantProps<typeof fieldWrapperVariants>;

export default function FieldWrapper({
  label,
  decorator,
  className,
  variant,
  isLoading,
  children,
  message
}: FieldWrapperProps) {
  return (
    <div className={cn(fieldWrapperVariants({ variant }), className)}>
      {label && <Label>{label}</Label>}
      <div className="flex flex-row items-center">
        {children}
        {decorator}
      </div>
      {!isLoading && message}
    </div>
  );
}
