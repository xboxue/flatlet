import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface Props {
  onPressItem: () => void;
  address: string;
}

export const LocationItem = (props: Props) => (
  <TouchableOpacity onPress={props.onPressItem} style={styles.container}>
    <Text>{props.address}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    padding: 10
  }
});
