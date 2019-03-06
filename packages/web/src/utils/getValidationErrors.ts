import { ApolloError } from 'apollo-client';
import { ValidationError } from 'class-validator';
import { GraphQLError } from 'graphql';

interface GraphQLValidationError extends GraphQLError {
  extensions: {
    exception: {
      validationErrors: ValidationError[];
    };
  };
}

export const getValidationErrors = (error: any) => {
  if (!(error instanceof ApolloError)) throw error;

  const validationError = error.graphQLErrors.find(
    child => child.message === 'Argument Validation Error'
  ) as GraphQLValidationError;

  if (!validationError) throw error;

  return getErrors(validationError.extensions.exception.validationErrors);
};

const getErrors = (validationErrors: ValidationError[]) => {
  return validationErrors.reduce((errors, error) => {
    // Display one error at a time
    return {
      ...errors,
      [error.property]: Object.values(error.constraints)[0]
    };
  }, {});
};
