import gql from 'graphql-tag';

export const listingsQuery = gql`
  query Listings {
    listings {
      id
      address
      bedrooms
      bathrooms
      sqft
      price
    }
  }
`;
