import gql from 'graphql-tag';

export const signupMutation = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      id
      email
      name
    }
  }
`;
