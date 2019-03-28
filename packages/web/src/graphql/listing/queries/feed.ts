import gql from 'graphql-tag';

export const feedQuery = gql`
  query Feed {
    feed {
      id
      homeType
      address
      bedrooms
      bathrooms
      sqft
      price
      photos {
        url
      }
      amenities {
        name
      }
    }
  }
`;
