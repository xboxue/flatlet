import { FieldProps } from 'formik';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { usePlacePredictions } from 'src/hooks/usePlacePredictions';
import { LocationItemList } from './LocationItemList';

export const LocationField = ({
  field,
  form: { touched, errors, setFieldValue },
  ...props
}: FieldProps) => {
  const getPlacePredictions = usePlacePredictions();
  const [predictions, setPredictions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);

  const handleChangeText = (text: string) => {
    if (!text) {
      setPredictions([]);
      return;
    }

    getPlacePredictions(
      {
        input: text,
        location: new google.maps.LatLng(43.6532, -79.3832),
        radius: 5000,
        componentRestrictions: { country: 'ca' },
        types: ['address']
      },
      result => setPredictions(result)
    );
  };

  const handleItemPress = (address: string) => {
    setPredictions([]);
    setFieldValue(field.name, address);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={handleChangeText}
        {...field}
        {...props}
      />
      {touched[field.name] && errors[field.name] && (
        <Text>{errors[field.name]}</Text>
      )}
      <LocationItemList
        predictions={predictions}
        onItemPress={handleItemPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    padding: 10
  },
  container: {
    marginBottom: 10
  }
});
