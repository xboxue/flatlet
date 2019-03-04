import { Image, Text, View } from 'react-native';

interface Props {
  title: string;
  image: string;
  children: React.ReactChild;
}

export const Card = (props: Props) => (
  <View>
    <Image source={{ uri: props.image }} />
    <Text>{props.title}</Text>

    <View>{props.children}</View>
  </View>
);
