import { StyleSheet, Switch, Text, View } from 'react-native';
import { Chip } from './Chip/Chip';

interface Props {
  setMapHidden: (value: boolean) => void;
  isMapHidden: boolean;
}

export const FeedBar = (props: Props) => (
  <View style={styles.container}>
    <Chip label="Home Type" onPress={() => {}} isSelected={false} />
    <Chip label="Price" onPress={() => {}} isSelected={false} />
    <Chip label="Bedrooms" onPress={() => {}} isSelected={false} />

    <View style={styles.switchContainer}>
      <Text style={styles.switchText}>Map</Text>
      <Switch
        onValueChange={() => {
          props.setMapHidden(!props.isMapHidden);
        }}
        value={!props.isMapHidden}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center'
  },
  switchContainer: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center'
  },
  switchText: {
    paddingRight: 5
  }
});
