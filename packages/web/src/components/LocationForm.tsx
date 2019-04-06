import { Field } from 'formik';
import { Text, View } from 'react-native';
import { LocationField } from './LocationField';
import { TextField } from './TextField';
import { PageProps } from './Wizard';

export const LocationForm = (props: PageProps) => {
  return (
    <View>
      <Text>Address</Text>
      <Field
        name="address"
        component={LocationField}
        placeholder="e.g. 1001 Bay St"
      />
      <Text>Unit</Text>
      <Field name="unit" component={TextField} />
    </View>
  );
};
