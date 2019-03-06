import { Field } from 'formik';
import { Text, View } from 'react-native';
import { ListingFormPageProps } from './ListingForm';
import { TextField } from './TextField';

export const BedBathForm = (props: ListingFormPageProps) => (
  <View>
    <Text>Property Information</Text>
    <Field name="bedrooms" component={TextField} placeholder="Bedrooms" />
    <Field name="bathrooms" component={TextField} placeholder="Bathrooms" />
    <Field name="sqft" component={TextField} placeholder="e.g. 896" />
  </View>
);
