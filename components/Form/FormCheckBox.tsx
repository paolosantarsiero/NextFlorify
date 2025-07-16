import { Checkbox } from '@/components/ui/checkbox';
import { CheckboxProps } from '@radix-ui/react-checkbox';
import FormFieldWrapper, { FormFieldWrapperProps } from './FormFieldWrapper';

type Props = FormFieldWrapperProps &
  CheckboxProps & {
    className?: string;
  };

export default function FormCheckBox({ name, className, disabled, isLoading, ...props }: Props) {
  return (
    <FormFieldWrapper name={name} className={className} isLoading={isLoading}>
      {(field) => (
        <Checkbox checked={Boolean(field.value)} onCheckedChange={field.onChange} {...props} />
      )}
    </FormFieldWrapper>
  );
}
