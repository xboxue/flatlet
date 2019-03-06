import React from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  children: React.ReactNode[];
}

export const ChipGroup = (props: Props) => (
  <View style={styles.container}>{props.children}</View>
);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});
