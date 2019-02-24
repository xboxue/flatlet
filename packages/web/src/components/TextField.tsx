import { FieldProps } from 'formik';
import { Text } from 'react-native';
import styled from 'styled-components/native';

export default ({ field, form: { touched, errors }, ...props }: FieldProps) => (
  <InputWrapper>
    <Input {...field} {...props} />
    {touched[field.name] && errors[field.name] && (
      <Text>{errors[field.name]}</Text>
    )}
  </InputWrapper>
);

const Input = styled.TextInput`
  border: 1px;
  padding: 10px 10px 10px 10px;
`;

const InputWrapper = styled.View`
  margin-bottom: 10px;
`;
