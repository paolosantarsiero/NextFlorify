import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const gradientOutlineWrapperVariants = cva(
  'bg-gradient-to-r from-tiffanyGreen to-violetRose text-white p-[1px] rounded-full h-10 flex items-center justify-center',
  {
    variants: {
      variant: {
        default: ''
      }
    }
  }
);

const internalGradientOutlineWrapperVariants = cva(
  'bg-white text-foreground rounded-full z-30 h-full w-full flex items-center justify-center hover:bg-accent hover:text-accent-foreground',
  {
    variants: {
      variant: {
        default: ''
      }
    }
  }
);

type Props = {
  children: React.ReactNode;
  className?: string;
  variant?: VariantProps<typeof gradientOutlineWrapperVariants>['variant'];
  internalVariant?: VariantProps<typeof internalGradientOutlineWrapperVariants>['variant'];
  internalClassName?: string;
};

export default function GradientOutlineWrapper({
  children,
  className,
  variant,
  internalVariant,
  internalClassName
}: Props) {
  return (
    <div className={cn(gradientOutlineWrapperVariants({ variant, className }))}>
      <div
        className={cn(
          internalGradientOutlineWrapperVariants({
            variant: internalVariant,
            className: internalClassName
          })
        )}
      >
        {children}
      </div>
    </div>
  );
}
