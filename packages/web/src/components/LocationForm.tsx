import { Field } from 'formik';
import { View } from 'react-native';
import { ListingFormPageProps } from './ListingForm';
import { TextField } from './TextField';

export const LocationForm = (props: ListingFormPageProps) => (
  <View>
    <Field
      name="address"
      component={TextField}
      placeholder="e.g. 1001 Bay St"
    />
    <Field name="apt" component={TextField} placeholder="Apt, suite, etc." />
    <Field name="city" component={TextField} placeholder="e.g. Toronto" />
    <Field name="province" component={TextField} placeholder="e.g. Ontario" />
  </View>
);
