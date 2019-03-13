import { Field, Formik, FormikActions } from 'formik';
import { Button, View } from 'react-native';
import { useSignup } from 'src/graphql/types';
import { getValidationErrors } from 'src/utils/getValidationErrors';
import * as Yup from 'yup';
import { TextField } from './TextField';

type Values = typeof initialValues;

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
};

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

export const SignupForm = () => {
  const signup = useSignup();

  const handleSubmit = async (
    values: Values,
    { setErrors, setSubmitting }: FormikActions<Values>
  ) => {
    try {
      await signup({ variables: { input: values } });
    } catch (error) {
      setErrors(getValidationErrors(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
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
          <Field
            name="password"
            component={TextField}
            placeholder="Password"
            secureTextEntry={true}
          />

          <Button onPress={submitForm} title="Submit" />
        </View>
      )}
    </Formik>
  );
};
