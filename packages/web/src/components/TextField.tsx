import { FieldProps } from 'formik';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export const TextField = ({
  field,
  form: { touched, errors },
  ...props
}: FieldProps) => (
  <View style={styles.container}>
    <TextInput style={styles.textInput} {...field} {...props} />
    {touched[field.name] && errors[field.name] && (
      <Text>{errors[field.name]}</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    padding: 10
  },
  container: {
    marginBottom: 10
  }
});
