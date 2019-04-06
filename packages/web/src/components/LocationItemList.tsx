import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { LocationItem } from './LocationItem';

interface Props {
  onItemPress: (address: string) => void;
  predictions: google.maps.places.AutocompletePrediction[];
}

export const LocationItemList = (props: Props) => {
  const renderItem = ({
    item
  }: ListRenderItemInfo<google.maps.places.AutocompletePrediction>) => (
    <LocationItem
      onPressItem={() => props.onItemPress(item.description)}
      address={item.description}
    />
  );

  return (
    <FlatList
      data={props.predictions}
      renderItem={renderItem}
      keyExtractor={item => item.place_id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: 'grey'
  }
});
