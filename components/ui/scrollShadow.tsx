import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const scrollShadowVariants = cva(
  'pointer-events-none absolute left-0 right-0 h-4 z-10 transition-opacity duration-300',
  {
    variants: {
      position: {
        top: 'top-0 rounded-t-xl bg-gradient-to-b from-primary/10 via-primary/[0.07] to-transparent',
        bottom:
          'bottom-0 rounded-b-xl bg-gradient-to-t from-primary/10 via-primary/[0.07] to-transparent'
      },
      visible: {
        true: 'opacity-100',
        false: 'opacity-0'
      }
    },
    defaultVariants: {
      visible: true
    }
  }
);

export type ScrollShadowVariants = VariantProps<typeof scrollShadowVariants>;

export function ScrollShadow({
  position,
  visible,
  className,
  ...props
}: ScrollShadowVariants & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(scrollShadowVariants({ position, visible }), className)}
      aria-hidden
      {...props}
    />
  );
}

export { scrollShadowVariants };
