import { ApolloError } from 'apollo-client';
import { ValidationError } from 'class-validator';
import { Field, Formik, FormikActions } from 'formik';
import { GraphQLError } from 'graphql';
import { Button, View } from 'react-native';
import * as Yup from 'yup';
import { useSignupMutation } from '../graphql/generated';
import TextField from './TextField';

interface Values {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface GraphQLValidationError extends GraphQLError {
  validationErrors: ValidationError[];
}

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required')
});

export default () => {
  const useSignup = useSignupMutation();

  const getValidationErrors = (validationError: GraphQLValidationError) => {
    return validationError.validationErrors.reduce((errors, error) => {
      // Display one error at a time
      return {
        ...errors,
        [error.property]: Object.values(error.constraints)[0]
      };
    }, {});
  };

  const handleSubmit = async (
    values: Values,
    { setErrors, setSubmitting }: FormikActions<Values>
  ) => {
    try {
      await useSignup({ variables: { data: values } });
      setSubmitting(false);
    } catch (error) {
      if (!(error instanceof ApolloError)) throw error;

      const validationError = error.graphQLErrors.find(
        child => child.message === 'Argument Validation Error'
      );

      if (!validationError) throw error;

      const errors = getValidationErrors(
        validationError as GraphQLValidationError
      );

      setErrors(errors);
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }}
      validationSchema={SignupSchema}
      onSubmit={handleSubmit}
    >
      {({ submitForm }) => (
        <View>
          <Field
            name="firstName"
            component={TextField}
            placeholder="First Name"
          />
          <Field
            name="lastName"
            component={TextField}
            placeholder="Last Name"
          />
          <Field name="email" component={TextField} placeholder="Email" />
          <Field name="password" component={TextField} placeholder="Password" />

          <Button onPress={submitForm} title="Submit" />
        </View>
      )}
    </Formik>
  );
};
