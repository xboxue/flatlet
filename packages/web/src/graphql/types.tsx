export type Maybe<T> = T | null;

export interface CreateListingInput {
  homeType: string;

  ownerType: string;

  address: string;

  unit?: Maybe<string>;

  bedrooms: number;

  bathrooms: number;

  sqft: number;

  price: number;

  description?: Maybe<string>;

  imageUrl?: Maybe<string>;
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

export type CreateListingVariables = {
  data: CreateListingInput;
};

export type CreateListingMutation = {
  __typename?: "Mutation";

  createListing: CreateListingCreateListing;
};

export type CreateListingCreateListing = {
  __typename?: "Listing";

  id: string;

  homeType: string;
};

export type ListingsVariables = {};

export type ListingsQuery = {
  __typename?: "Query";

  listings: ListingsListings[];
};

export type ListingsListings = {
  __typename?: "Listing";

  id: string;

  address: string;

  bedrooms: number;

  bathrooms: number;

  sqft: number;

  price: number;
};

export type ConfirmUserVariables = {
  token: string;
};

export type ConfirmUserMutation = {
  __typename?: "Mutation";

  confirmUser: boolean;
};

export type LoginVariables = {
  email: string;
  password: string;
};

export type LoginMutation = {
  __typename?: "Mutation";

  login: LoginLogin;
};

export type LoginLogin = {
  __typename?: "User";

  id: string;

  email: string;

  name: string;
};

export type SignupVariables = {
  data: SignupInput;
};

export type SignupMutation = {
  __typename?: "Mutation";

  signup: SignupSignup;
};

export type SignupSignup = {
  __typename?: "User";

  id: string;

  email: string;

  name: string;
};

import gql from "graphql-tag";
import * as ReactApolloHooks from "react-apollo-hooks";

// ====================================================
// Components
// ====================================================

export const CreateListingDocument = gql`
  mutation CreateListing($data: CreateListingInput!) {
    createListing(data: $data) {
      id
      homeType
    }
  }
`;
export function useCreateListing(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    CreateListingMutation,
    CreateListingVariables
  >
) {
  return ReactApolloHooks.useMutation<
    CreateListingMutation,
    CreateListingVariables
  >(CreateListingDocument, baseOptions);
}
export const ListingsDocument = gql`
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
export function useListings(
  baseOptions?: ReactApolloHooks.QueryHookOptions<ListingsVariables>
) {
  return ReactApolloHooks.useQuery<ListingsQuery, ListingsVariables>(
    ListingsDocument,
    baseOptions
  );
}
export const ConfirmUserDocument = gql`
  mutation ConfirmUser($token: String!) {
    confirmUser(token: $token)
  }
`;
export function useConfirmUser(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    ConfirmUserMutation,
    ConfirmUserVariables
  >
) {
  return ReactApolloHooks.useMutation<
    ConfirmUserMutation,
    ConfirmUserVariables
  >(ConfirmUserDocument, baseOptions);
}
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;
export function useLogin(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    LoginMutation,
    LoginVariables
  >
) {
  return ReactApolloHooks.useMutation<LoginMutation, LoginVariables>(
    LoginDocument,
    baseOptions
  );
}
export const SignupDocument = gql`
  mutation Signup($data: SignupInput!) {
    signup(data: $data) {
      id
      email
      name
    }
  }
`;
export function useSignup(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    SignupMutation,
    SignupVariables
  >
) {
  return ReactApolloHooks.useMutation<SignupMutation, SignupVariables>(
    SignupDocument,
    baseOptions
  );
}
