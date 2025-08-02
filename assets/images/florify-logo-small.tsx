import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { SVGProps } from 'react';

const LogoVariants = cva('w-15 h-15', {
  variants: {
    variant: {
      violetRose: 'text-violetRose',
      tiffanyGreen: 'text-tiffanyGreen',
      lilac: 'text-lilac'
    }
  },
  defaultVariants: {
    variant: 'violetRose'
  }
});

export const FlorifyLogoSmall = ({
  variant,
  ...props
}: SVGProps<SVGSVGElement> & VariantProps<typeof LogoVariants>) => {
  return (
    <svg
      width="27"
      height="26"
      viewBox="0 0 27 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(LogoVariants({ variant }), props.className)}
    >
      <path
        d="M13.5369 0.00030899C6.29238 0.00030899 0.418457 5.84278 0.418457 13.0501C0.418457 19.7031 5.42156 25.1917 11.8884 25.9984V17.137C11.8884 16.2352 12.6228 15.5058 13.5293 15.5058C14.4358 15.5058 15.1702 16.2364 15.1702 17.137V25.9997C21.6434 25.1993 26.6541 19.7069 26.6541 13.0501C26.6541 5.84278 20.7815 0.00030899 13.5369 0.00030899ZM9.01833 15.913C7.43223 15.913 6.14703 14.6344 6.14703 13.0564C6.14703 11.4785 7.43223 10.1999 9.01833 10.1999C10.6044 10.1999 11.8896 11.4785 11.8896 13.0564C11.8896 14.6344 10.6044 15.913 9.01833 15.913ZM13.5293 11.4252C11.9432 11.4252 10.658 10.1466 10.658 8.56868C10.658 6.99073 11.9432 5.71213 13.5293 5.71213C15.1154 5.71213 16.4006 6.99073 16.4006 8.56868C16.4006 10.1466 15.1154 11.4252 13.5293 11.4252ZM18.0415 15.913C16.4554 15.913 15.1702 14.6344 15.1702 13.0564C15.1702 11.4785 16.4554 10.1999 18.0415 10.1999C19.6276 10.1999 20.9128 11.4785 20.9128 13.0564C20.9128 14.6344 19.6276 15.913 18.0415 15.913Z"
        fill="currentColor"
      />
    </svg>
  );
};
