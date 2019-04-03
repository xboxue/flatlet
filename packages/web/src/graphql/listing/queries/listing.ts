import gql from 'graphql-tag';

export const ListingQuery = gql`
  query listing($id: ID!) {
    listing(id: $id) {
      id
      homeType
      address
      bedrooms
      bathrooms
      sqft
      price
      photos {
        id
        url
      }
      amenities {
        name
      }
    }
  }
`;
