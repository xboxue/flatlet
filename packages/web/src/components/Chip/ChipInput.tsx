import { Field, FieldProps } from 'formik';
import { Chip } from './Chip';

interface Props {
  name: string;
  value: string;
}

export const ChipInput = (props: Props) => (
  <Field name={props.name}>
    {({ field, form }: FieldProps) => (
      <Chip
        label={props.value}
        onPress={() => form.setFieldValue(props.name, props.value)}
        isSelected={field.value === props.value}
      />
    )}
  </Field>
);
