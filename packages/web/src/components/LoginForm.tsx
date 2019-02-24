import { ApolloError } from 'apollo-client';
import { Field, Formik, FormikActions } from 'formik';
import Router from 'next/router';
import { Button, Text, View } from 'react-native';
import * as Yup from 'yup';
import { useLoginMutation } from '../graphql/generated';
import TextField from './TextField';

interface Values {
  email: string;
  password: string;
}
export default () => {
  const useLogin = useLoginMutation();

  const handleSubmit = async (
    values: Values,
    { setStatus, setSubmitting }: FormikActions<Values>
  ) => {
    try {
      await useLogin({ variables: values });
      setSubmitting(false);
      Router.push('/feed');
    } catch (error) {
      if (!(error instanceof ApolloError)) throw error;

      setStatus({ login: 'Invalid email or password' });
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object().shape({
        email: Yup.string().required('Required'),
        password: Yup.string().required('Required')
      })}
      onSubmit={handleSubmit}
    >
      {({ submitForm, status }) => (
        <View>
          <Field name="email" component={TextField} placeholder="Email" />
          <Field name="password" component={TextField} placeholder="Password" />

          {status && status.login && <Text>{status.login}</Text>}
          <Button onPress={submitForm} title="Submit" />
        </View>
      )}
    </Formik>
  );
};
