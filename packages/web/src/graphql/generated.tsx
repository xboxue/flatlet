export type Maybe<T> = T | null;

export interface CreateListingInput {
  title: string;

  description: string;

  imageUrl: string;

  location: string;

  price: number;
}

export interface ResetPasswordInput {
  password: string;

  token: string;
}

export interface SignupInput {
  password: string;

  firstName: string;

  lastName: string;

  email: string;
}

// ====================================================
// Documents
// ====================================================

export type LoginMutationVariables = {
  email: string;
  password: string;
};

export type LoginMutationMutation = {
  __typename?: "Mutation";

  login: LoginMutationLogin;
};

export type LoginMutationLogin = {
  __typename?: "User";

  id: string;

  email: string;

  name: string;
};

export type SignupMutationVariables = {
  data: SignupInput;
};

export type SignupMutationMutation = {
  __typename?: "Mutation";

  signup: SignupMutationSignup;
};

export type SignupMutationSignup = {
  __typename?: "User";

  id: string;

  email: string;

  name: string;
};

export type ListingsQueryVariables = {};

export type ListingsQueryQuery = {
  __typename?: "Query";

  listings: ListingsQueryListings[];
};

export type ListingsQueryListings = {
  __typename?: "Listing";

  id: string;

  title: string;

  description: string;

  imageUrl: string;

  location: string;

  price: number;

  user: ListingsQueryUser;
};

export type ListingsQueryUser = {
  __typename?: "User";

  name: string;
};

import * as ReactApollo from "react-apollo";
import * as React from "react";
import * as ReactApolloHooks from "react-apollo-hooks";
import gql from "graphql-tag";

// ====================================================
// Components
// ====================================================

export const LoginMutationDocument = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;
export class LoginMutationComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<LoginMutationMutation, LoginMutationVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<LoginMutationMutation, LoginMutationVariables>
        mutation={LoginMutationDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type LoginMutationProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<LoginMutationMutation, LoginMutationVariables>
> &
  TChildProps;
export type LoginMutationMutationFn = ReactApollo.MutationFn<
  LoginMutationMutation,
  LoginMutationVariables
>;
export function LoginMutationHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        LoginMutationMutation,
        LoginMutationVariables,
        LoginMutationProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    LoginMutationMutation,
    LoginMutationVariables,
    LoginMutationProps<TChildProps>
  >(LoginMutationDocument, operationOptions);
}
export function useLoginMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    LoginMutationMutation,
    LoginMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    LoginMutationMutation,
    LoginMutationVariables
  >(LoginMutationDocument, baseOptions);
}
export const SignupMutationDocument = gql`
  mutation SignupMutation($data: SignupInput!) {
    signup(data: $data) {
      id
      email
      name
    }
  }
`;
export class SignupMutationComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<SignupMutationMutation, SignupMutationVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<SignupMutationMutation, SignupMutationVariables>
        mutation={SignupMutationDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type SignupMutationProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<SignupMutationMutation, SignupMutationVariables>
> &
  TChildProps;
export type SignupMutationMutationFn = ReactApollo.MutationFn<
  SignupMutationMutation,
  SignupMutationVariables
>;
export function SignupMutationHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        SignupMutationMutation,
        SignupMutationVariables,
        SignupMutationProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    SignupMutationMutation,
    SignupMutationVariables,
    SignupMutationProps<TChildProps>
  >(SignupMutationDocument, operationOptions);
}
export function useSignupMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    SignupMutationMutation,
    SignupMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    SignupMutationMutation,
    SignupMutationVariables
  >(SignupMutationDocument, baseOptions);
}
export const ListingsQueryDocument = gql`
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
export class ListingsQueryComponent extends React.Component<
  Partial<ReactApollo.QueryProps<ListingsQueryQuery, ListingsQueryVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<ListingsQueryQuery, ListingsQueryVariables>
        query={ListingsQueryDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type ListingsQueryProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<ListingsQueryQuery, ListingsQueryVariables>
> &
  TChildProps;
export function ListingsQueryHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ListingsQueryQuery,
        ListingsQueryVariables,
        ListingsQueryProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    ListingsQueryQuery,
    ListingsQueryVariables,
    ListingsQueryProps<TChildProps>
  >(ListingsQueryDocument, operationOptions);
}
export function useListingsQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<ListingsQueryVariables>
) {
  return ReactApolloHooks.useQuery<ListingsQueryQuery, ListingsQueryVariables>(
    ListingsQueryDocument,
    baseOptions
  );
}
