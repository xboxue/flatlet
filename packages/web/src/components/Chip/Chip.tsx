import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  isSelected: boolean;
  label: string;
  onPress: () => void;
}

export const Chip = (props: Props) => (
  <TouchableOpacity style={styles.container} onPress={props.onPress}>
    <View
      style={[
        styles.textContainer,
        props.isSelected && { borderColor: 'pink', borderWidth: 0.5 }
      ]}
    >
      <Text style={[styles.labelText, props.isSelected && { color: 'pink' }]}>
        {props.label}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    marginRight: 5,
    marginLeft: 5
  },
  textContainer: {
    borderRadius: 8,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: '#E7E7E7'
  },
  labelText: {
    fontSize: 16
  }
});
