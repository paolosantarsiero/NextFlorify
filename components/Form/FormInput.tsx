import { Input, InputProps } from '@/components/ui/input';
import { cn } from '@/lib/utils';
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
  return (
    <FormFieldWrapper
      name={name}
      className={cn(className)}
      label={label}
      isLoading={isLoading}
      decorator={decorator}
    >
      {(field) => (
        <Input
          {...field}
          {...props}
          type={type}
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
        />
      )}
    </FormFieldWrapper>
  );
}
