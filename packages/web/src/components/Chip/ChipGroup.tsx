import { Field, FieldProps } from 'formik';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  children: React.ReactNode[];
  name: string;
}

export const ChipGroup = (props: Props) => (
  <Field name={props.name}>
    {({ field, form: { errors, touched } }: FieldProps) => (
      <View>
        <View style={styles.container}>{props.children}</View>
        {touched[field.name] && errors[field.name] && (
          <Text>{errors[field.name]}</Text>
        )}
      </View>
    )}
  </Field>
);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});
