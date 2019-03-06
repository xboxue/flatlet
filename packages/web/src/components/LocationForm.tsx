import { Field } from 'formik';
import { Text, View } from 'react-native';
import { ListingFormPageProps } from './ListingForm';
import { TextField } from './TextField';

export const LocationForm = (props: ListingFormPageProps) => (
  <View>
    <Text>Address</Text>
    <Field
      name="address"
      component={TextField}
      placeholder="e.g. 1001 Bay St"
    />
  </View>
);
