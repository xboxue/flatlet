import gql from 'graphql-tag';

export const signupMutation = gql`
  mutation Signup($data: SignupInput!) {
    signup(data: $data) {
      id
      email
      name
    }
  }
`;
