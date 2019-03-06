import { Text, View } from 'react-native';
import { ChipGroup } from './Chip/ChipGroup';
import { ChipInput } from './Chip/ChipInput';

export const PropertyForm = () => {
  return (
    <View>
      <Text>What are you renting?</Text>
      <ChipGroup>
        <ChipInput name="homeType" value="Apartment" />
        <ChipInput name="homeType" value="Condo" />
        <ChipInput name="homeType" value="House" />
        <ChipInput name="homeType" value="Townhouse" />
      </ChipGroup>

      <Text>What is your relationship to the property?</Text>
      <ChipGroup>
        <ChipInput name="ownerType" value="Owner" />
        <ChipInput name="ownerType" value="Administrator/Other" />
      </ChipGroup>
    </View>
  );
};
