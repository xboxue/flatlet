import { Field } from 'formik';
import { Text, View } from 'react-native';
import { TextField } from './TextField';
import { PageProps } from './Wizard';

export const LocationForm = (props: PageProps) => (
  <View>
    <Text>Address</Text>
    <Field
      name="address"
      component={TextField}
      placeholder="e.g. 1001 Bay St"
    />
  </View>
);
