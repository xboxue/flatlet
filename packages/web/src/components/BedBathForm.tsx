import { Field } from 'formik';
import { Text, View } from 'react-native';
import { TextField } from './TextField';
import { PageProps } from './Wizard';

export const BedBathForm = (props: PageProps) => (
  <View>
    <Text>Property Information</Text>
    <Field name="bedrooms" component={TextField} placeholder="Bedrooms" />
    <Field name="bathrooms" component={TextField} placeholder="Bathrooms" />
    <Field name="sqft" component={TextField} placeholder="e.g. 896" />
  </View>
);
