import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import Card from '../components/Card';
import { useListingsQuery } from '../graphql/generated';

export default () => {
  const { data, loading, error } = useListingsQuery();
  if (loading) return 'Loading...';
  if (error) return 'Error';

  if (data) {
    return (
      <StyledView>
        <FlatList
          data={data.listings}
          renderItem={({ item }) => <Card {...item} />}
          keyExtractor={item => item.id}
        />
      </StyledView>
    );
  }
};

const StyledView = styled.View`
  flex: 1;
`;
