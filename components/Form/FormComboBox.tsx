import { ComboBox, ComboBoxProps } from '@/components/ComboBox/ComboBox';
import FormFieldWrapper, { FormFieldWrapperProps } from './FormFieldWrapper';

type Props = ComboBoxProps & FormFieldWrapperProps;

export default function FormComboBox({
  name,
  options,
  className,
  isLoading,
  ...props
}: Props) {
  return (
    <FormFieldWrapper name={name} className={className} isLoading={isLoading}>
      {(field) => (
        <ComboBox
          name={name}
          options={options}
          value={field.value}
          onChange={field.onChange}
          {...props}
        />
      )}
    </FormFieldWrapper>
  );
}
