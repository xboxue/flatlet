import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface Props {
  onPress: () => void;
  title: string;
}

export const Button = (props: Props) => (
  <TouchableOpacity style={styles.button} onPress={props.onPress}>
    <Text style={styles.title}>{props.title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    borderRadius: 3,
    backgroundColor: 'pink',
    padding: 5,
    marginTop: 2
  },
  title: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center'
  }
});
