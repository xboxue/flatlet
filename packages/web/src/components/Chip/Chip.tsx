import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  isSelected: boolean;
  label: string;
  onPress: () => void;
}

export const Chip = (props: Props) => (
  <TouchableOpacity onPress={props.onPress}>
    <View
      style={[
        styles.textContainer,
        props.isSelected && { borderColor: 'pink', borderWidth: 0.5 }
      ]}
    >
      <Text style={[styles.buttonText, props.isSelected && { color: 'pink' }]}>
        {props.label}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  textContainer: {
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 2
  },
  buttonText: {
    fontSize: 18
  }
});
