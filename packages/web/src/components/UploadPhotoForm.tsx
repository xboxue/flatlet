import { Image, StyleSheet, Text, View } from 'react-native';
import { UploadPhotoButton } from 'src/components/UploadPhotoButton.web';
import {
  useListingQuery,
  useSignedUrlQuery,
  useUploadPhotoMutation
} from 'src/graphql/types';

interface Props {
  id: string;
}

export const UploadPhotoForm = (props: Props) => {
  const { data, error, loading, refetch: fetchListing } = useListingQuery({
    variables: { id: props.id }
  });

  const { refetch: fetchUrl } = useSignedUrlQuery({ skip: true });
  const uploadPhoto = useUploadPhotoMutation();

  if (loading) return <Text>Loading...</Text>;
  if (!(data && data.listing) || error) return <Text>Error</Text>;

  const handleChange = async (files: FileList | null) => {
    if (!files) return;

    const {
      data: { signedUrl }
    } = await fetchUrl();
    const { pathname } = new URL(signedUrl);

    try {
      const response = await fetch(signedUrl, {
        method: 'PUT',
        body: files[0]
      });

      if (!response.ok) throw new Error(response.statusText);

      await uploadPhoto({ variables: { url: pathname, id: props.id } });
      fetchListing();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text>{data.listing.address}</Text>
      <UploadPhotoButton onChange={handleChange} />
      {data.listing.photos.map(photo => (
        <Image
          style={styles.photo}
          key={photo.id}
          source={{ uri: photo.url }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  photo: {
    width: 300,
    height: 200
  }
});
