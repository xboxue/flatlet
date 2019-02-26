import styled from 'styled-components/native';
import { ListingsQueryListings } from '../graphql/generated';

export const Card = (props: ListingsQueryListings) => {
  return (
    <PostWrapper>
      <UserName>{props.user.name}</UserName>
      <Title>{props.title}</Title>
      <Description>{props.description}</Description>
      <Location>{props.location}</Location>
      <DisplayImage
        source={{
          uri: props.imageUrl
        }}
      />
    </PostWrapper>
  );
};

const PostWrapper = styled.View`
  background: white;
  align-items: center;
  flex-grow: 1;
  justify-content: center;
`;

const UserName = styled.Text`
  color: #101010;
`;

const Title = styled.Text`
  font-size: 24;
  align-items: center;
`;

const Description = styled.Text`
  font-size: 16;
`;

const Location = styled.Text`
  font-size: 16;
`;

const DisplayImage = styled.Image`
  width: 500;
  height: 372;
`;
