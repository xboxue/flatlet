import { ApolloError } from 'apollo-client';
import { Field, Formik, FormikActions } from 'formik';
import Router from 'next/router';
import { Button, Text, View } from 'react-native';
import { useLoginMutation } from 'src/graphql/types';
import * as Yup from 'yup';
import { TextField } from './TextField';

interface Values {
  email: string;
  password: string;
}
export const LoginForm = () => {
  const login = useLoginMutation();

  const handleSubmit = async (
    values: Values,
    { setStatus, setSubmitting }: FormikActions<Values>
  ) => {
    try {
      await login({ variables: values });
      Router.push('/feed');
    } catch (error) {
      if (!(error instanceof ApolloError)) throw error;
      setStatus({ login: 'Invalid email or password' });
    } finally {
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
          <Field
            name="password"
            component={TextField}
            placeholder="Password"
            secureTextEntry={true}
          />

          {status && status.login && <Text>{status.login}</Text>}
          <Button onPress={submitForm} title="Submit" />
        </View>
      )}
    </Formik>
  );
};
