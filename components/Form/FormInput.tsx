import { Input, InputProps } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import FormFieldWrapper, { FormFieldWrapperProps } from './FormFieldWrapper';

type Props = InputProps &
  FormFieldWrapperProps & {
    type?: 'text' | 'number' | 'password';
    suffix?: string;
  };

export default function FormInput({
  name,
  className,
  type = 'text',
  suffix,
  label,
  isLoading,
  decorator,
  ...props
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormFieldWrapper
      name={name}
      className={cn(className)}
      label={label}
      isLoading={isLoading}
      decorator={decorator}
    >
      {(field) => (
        <div className="w-full relative">
          <Input
            {...field}
            {...props}
            type={type === 'password' && showPassword ? 'text' : type}
            value={type === 'number' ? Number(field.value) || '' : field.value}
            onChange={(e) => {
              const value =
                type === 'number'
                  ? e.target.value === ''
                    ? ''
                    : Number(e.target.value)
                  : e.target.value;
              field.onChange(value);
            }}
          ></Input>
          {type === 'password' && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <EyeIcon className="h-4 w-4" aria-hidden="true" />
              ) : (
                <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
              )}
              <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
            </Button>
          )}
        </div>
      )}
    </FormFieldWrapper>
  );
}
