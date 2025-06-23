import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const gradientOutlineWrapperVariants = cva(
  'bg-gradient-to-r from-tiffanyGreen to-violetRose text-white p-1 rounded-full',
  {
    variants: {
      variant: {
        default: ''
      }
    }
  }
);

const internalGradientOutlineWrapperVariants = cva(
  'bg-white text-black px-4 py-2 rounded-full z-30',
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
