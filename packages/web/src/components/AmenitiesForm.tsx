import { Field } from 'formik';
import { View } from 'react-native';
import { TextField } from './TextField';

export const AmenitiesForm = () => (
  <View>
    <Field name="amenities" component={TextField} placeholder="" />
  </View>
);
