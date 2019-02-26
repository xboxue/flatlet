import { Field } from 'formik';
import { View } from 'react-native';
import { ListingFormPageProps } from './ListingForm';
import { TextField } from './TextField';

export const DetailsForm = (props: ListingFormPageProps) => (
  <View>
    <Field name="bedrooms" component={TextField} placeholder="Bedrooms" />
    <Field name="bathrooms" component={TextField} placeholder="Bathrooms" />
    <Field name="area" component={TextField} placeholder="e.g. 896" />
  </View>
);
