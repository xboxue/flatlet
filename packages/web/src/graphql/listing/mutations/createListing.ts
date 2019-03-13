import gql from 'graphql-tag';

export const createListingMutation = gql`
  mutation CreateListing($input: CreateListingInput!) {
    createListing(input: $input) {
      id
      homeType
    }
  }
`;
