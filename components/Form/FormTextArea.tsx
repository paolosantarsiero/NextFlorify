import { Textarea, TextareaProps } from '@/components/ui/textarea';
import FormFieldWrapper, { FormFieldWrapperProps } from './FormFieldWrapper';

type Props = TextareaProps & FormFieldWrapperProps;

export default function FormTextArea({ name, className, label, isLoading, ...props }: Props) {
  return (
    <FormFieldWrapper name={name} className={className} label={label} isLoading={isLoading}>
      {(field) => <Textarea {...field} {...props} value={field.value || ''} />}
    </FormFieldWrapper>
  );
}
