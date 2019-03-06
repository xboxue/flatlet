import gql from 'graphql-tag';

export const createListingMutation = gql`
  mutation CreateListing($data: CreateListingInput!) {
    createListing(data: $data) {
      id
      homeType
    }
  }
`;
