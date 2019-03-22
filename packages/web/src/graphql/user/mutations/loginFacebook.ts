import gql from 'graphql-tag';

export const loginFacebookMutation = gql`
  mutation LoginFacebook($code: String!) {
    loginFacebook(code: $code) {
      id
    }
  }
`;
