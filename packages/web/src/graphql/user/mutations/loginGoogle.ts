import gql from 'graphql-tag';

export const loginGoogleMutation = gql`
  mutation LoginGoogle($code: String!) {
    loginGoogle(code: $code) {
      id
    }
  }
`;
