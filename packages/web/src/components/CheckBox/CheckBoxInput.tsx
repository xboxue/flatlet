import { Field, FieldProps } from 'formik';
import { CheckBox } from './CheckBox';

interface Props {
  name: string;
  value: string;
}

export const CheckBoxInput = (props: Props) => (
  <Field name={props.name}>
    {({ field, form }: FieldProps) => (
      <CheckBox
        label={props.value}
        onPress={() => {
          if (field.value.includes(props.value)) {
            const nextValue = field.value.filter(
              (value: string) => value !== props.value
            );
            form.setFieldValue(props.name, nextValue);
          } else {
            const nextValue = field.value.concat(props.value);
            form.setFieldValue(props.name, nextValue);
          }
        }}
        checked={field.value.includes(props.value)}
      />
    )}
  </Field>
);
