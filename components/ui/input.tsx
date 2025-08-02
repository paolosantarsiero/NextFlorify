import * as React from 'react';

import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const inputVariants = cva(
  'flex h-9 w-full  bg-transparent  py-1 text-base transition-colors  file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
  {
    variants: {
      variant: {
        clean:
          'focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring disabled:opacity-50 md:text-sm',
        outline:
          'px-3 rounded-md border border-input shadow-sm file:border-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50 md:text-sm'
      }
    },
    defaultVariants: {
      variant: 'clean'
    }
  }
);
export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
