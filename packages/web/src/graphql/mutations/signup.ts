import gql from 'graphql-tag';

export const signupMutation = gql`
  mutation SignupMutation($data: SignupInput!) {
    signup(data: $data) {
      id
      email
      name
    }
  }
`;
