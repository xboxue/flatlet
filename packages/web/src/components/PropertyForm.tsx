import { Text, View } from 'react-native';
import { ChipGroup } from './Chip/ChipGroup';
import { ChipInput } from './Chip/ChipInput';
import { PageProps } from './Wizard';

export const PropertyForm = (props: PageProps) => {
  return (
    <View>
      <Text>What are you renting?</Text>
      <ChipGroup name="homeType">
        <ChipInput name="homeType" value="Apartment" />
        <ChipInput name="homeType" value="Condo" />
        <ChipInput name="homeType" value="House" />
        <ChipInput name="homeType" value="Townhouse" />
      </ChipGroup>

      <Text>What is your relationship to the property?</Text>
      <ChipGroup name="ownerType">
        <ChipInput name="ownerType" value="Owner" />
        <ChipInput name="ownerType" value="Administrator/Other" />
      </ChipGroup>
    </View>
  );
};
