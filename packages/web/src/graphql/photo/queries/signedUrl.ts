import gql from 'graphql-tag';

export const signedUrlQuery = gql`
  query SignedUrl {
    signedUrl
  }
`;
