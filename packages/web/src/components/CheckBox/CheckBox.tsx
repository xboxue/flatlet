import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  checked: boolean;
  label: string;
  onPress: () => void;
}

export const CheckBox = (props: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <View
        style={[
          styles.box,
          props.checked && { backgroundColor: 'pink', borderColor: 'pink' }
        ]}
      />
      <Text>{props.label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    height: 25,
    width: 25,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'grey'
  },
  container: {
    display: 'flex',
    flexDirection: 'row'
  }
});
