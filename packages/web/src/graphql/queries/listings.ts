import gql from 'graphql-tag';

export const listingsQuery = gql`
  query ListingsQuery {
    listings {
      id
      title
      description
      imageUrl
      location
      price
      user {
        name
      }
    }
  }
`;
