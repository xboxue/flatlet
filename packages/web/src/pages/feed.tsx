import { useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { LayoutProvider } from 'recyclerlistview';
import { FeedBar } from 'src/components/FeedBar';
import { ListingFeed } from 'src/components/ListingFeed';
import { Map } from 'src/components/Map.web';
import { useFeedQuery } from 'src/graphql/types';
import { getNumCols } from 'src/utils/getNumCols';

export default () => {
  const [width, setWidth] = useState(0);
  const [isMapHidden, setMapHidden] = useState(false);

  const { data, error, loading } = useFeedQuery();

  if (!(data && data.feed && data.feed.length)) return null;
  if (loading) return 'Loading...';
  if (error) return 'Error';

  const isWide = width > 960;
  const feedWidth = isWide ? width * 0.6 : width;
  const layoutWidth = isMapHidden ? width - 20 : feedWidth - 20;
  const numCols = getNumCols(width, isMapHidden);

  const handleLayout = ({ nativeEvent }: LayoutChangeEvent) =>
    setWidth(nativeEvent.layout.width);

  const layoutProvider = new LayoutProvider(
    () => 1,
    (type, dim) => {
      dim.width = layoutWidth / numCols;
      dim.height = layoutWidth / numCols;
    }
  );

  const computedStyles = styles(isWide);

  return (
    <View style={computedStyles.container}>
      <FeedBar setMapHidden={setMapHidden} isMapHidden={isMapHidden} />

      <View style={computedStyles.feedContainer} onLayout={handleLayout}>
        {isMapHidden || isWide ? (
          <ListingFeed data={data.feed} layoutProvider={layoutProvider} />
        ) : null}

        {!isMapHidden ? (
          <View style={computedStyles.mapContainer}>
            <Map />
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = (isWide: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1
    },
    mapContainer: {
      width: isWide ? '40%' : '100%',
      height: '100%'
    },
    feedContainer: {
      flexDirection: 'row',
      flex: 1
    }
  });
