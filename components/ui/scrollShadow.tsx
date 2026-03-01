import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const scrollShadowVariants = cva(
  'pointer-events-none absolute left-0 right-0 h-8 z-10 transition-opacity duration-300',
  {
    variants: {
      position: {
        top: 'top-0 bg-[radial-gradient(ellipse_80%_100%_at_50%_0%,hsl(var(--primary)/0.1)_0%,hsl(var(--primary)/0.04)_40%,transparent_70%)]',
        bottom:
          'bottom-0 bg-[radial-gradient(ellipse_80%_100%_at_50%_100%,hsl(var(--primary)/0.1)_0%,hsl(var(--primary)/0.04)_40%,transparent_70%)]'
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
