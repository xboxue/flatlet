import { Text, View } from 'react-native';
import { CheckBoxInput } from './CheckBox/CheckBoxInput';
import { PageProps } from './Wizard';

export const AmenitiesForm = (props: PageProps) => (
  <View>
    <Text>Amenities</Text>
    <CheckBoxInput name="amenities" value="Wifi" />
    <CheckBoxInput name="amenities" value="A/C" />
    <CheckBoxInput name="amenities" value="Balcony" />
    <CheckBoxInput name="amenities" value="Parking" />
    <CheckBoxInput name="amenities" value="Furnished" />
    <CheckBoxInput name="amenities" value="Ensuite Laundry" />
  </View>
);
