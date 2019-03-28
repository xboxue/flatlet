import { useState } from 'react';
import {
  DataProvider,
  LayoutProvider,
  RecyclerListView
} from 'recyclerlistview';
import { FeedFeed } from 'src/graphql/types';
import { Card } from './Card';

interface Props {
  data: FeedFeed[];
  layoutProvider: LayoutProvider;
}

export const ListingFeed = (props: Props) => {
  const [dataProvider] = useState(
    new DataProvider((r1, r2) => {
      return r1 !== r2;
    }).cloneWithRows(props.data)
  );

  return (
    <RecyclerListView
      layoutProvider={props.layoutProvider}
      dataProvider={dataProvider}
      rowRenderer={(type, data) => <Card {...data} />}
      useWindowScroll={true}
      canChangeSize={true}
    />
  );
};
