import { Image, StyleSheet, Text, View } from 'react-native';
import { FeedQuery } from 'src/graphql/types';

export const Card = (props: FeedQuery['feed'][0]) => (
  <View style={styles.container}>
    <Image
      style={styles.photo}
      source={{
        uri: props.photos[0].url
      }}
    />
    <View style={styles.textContainer}>
      <Image
        style={styles.bedIcon}
        source={{
          uri: 'https://s3.ca-central-1.amazonaws.com/flatlet/bed.svg'
        }}
      />
      <Text style={styles.labelText}>
        {props.bedrooms} bedroom{props.bedrooms > 1 ? 's' : ''}
      </Text>
      <Image
        style={styles.bathIcon}
        source={{
          uri: 'https://s3.ca-central-1.amazonaws.com/flatlet/bathtub.svg'
        }}
      />
      <Text style={styles.labelText}>
        {props.bathrooms} bathroom{props.bathrooms > 1 ? 's' : ''}
      </Text>
    </View>
    <Text style={styles.priceText}>${props.price}</Text>
    <Text style={styles.addressText}>{props.address}</Text>
  </View>
);

const styles = StyleSheet.create({
  photo: {
    width: '100%',
    height: '67%'
  },
  addressText: {
    fontSize: 14,
    color: '#707070',
    marginLeft: 6
  },
  priceText: {
    fontSize: 24,
    marginLeft: 6,
    marginBottom: 8
  },
  labelText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#737373',
    marginLeft: 5,
    marginRight: 20
  },
  container: {
    flex: 1,
    borderWidth: 1,
    margin: 10,
    borderColor: '#E7E7E7'
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10
  },
  bedIcon: {
    height: 17,
    width: 17
  },
  bathIcon: {
    height: 20,
    width: 20
  }
});
