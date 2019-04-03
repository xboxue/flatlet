import gql from 'graphql-tag';

export const uploadPhotoMutation = gql`
  mutation UploadPhoto($id: ID!, $url: String!) {
    uploadPhoto(id: $id, url: $url) {
      id
    }
  }
`;
