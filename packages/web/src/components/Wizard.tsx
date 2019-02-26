import { Formik, FormikActions, FormikErrors } from 'formik';
import React, { useState } from 'react';
import { Button, View } from 'react-native';

interface ChildProps<Values> {
  validate?: (values: Values) => void | object | Promise<FormikErrors<Values>>;
}

interface Props<Values> {
  children: React.ReactElement<ChildProps<Values>>[];
  onSubmit: (values: Values, formikActions: FormikActions<Values>) => void;
  initialValues: Values;
}

export function Wizard<Values>(props: Props<Values>) {
  const [page, setPage] = useState(0);
  const [values, setValues] = useState(props.initialValues);

  const activePage = React.Children.toArray(props.children)[page];
  const isLastPage = page === React.Children.count(props.children) - 1;

  const next = (formValues: Values) => {
    setPage(Math.min(page + 1, React.Children.count(props.children) - 1));
    setValues(formValues);
  };

  const previous = () => setPage(Math.max(page - 1, 0));

  const validate = (formValues: Values) => {
    return activePage.props.validate
      ? activePage.props.validate(formValues)
      : {};
  };

  const handleSubmit = (formValues: Values, bag: FormikActions<Values>) => {
    if (isLastPage) {
      return props.onSubmit(formValues, bag);
    }
    bag.setTouched({});
    bag.setSubmitting(false);
    next(formValues);
  };

  return (
    <Formik initialValues={values} onSubmit={handleSubmit} validate={validate}>
      {({ submitForm }) => (
        <View>
          {activePage}
          <View>
            {page > 0 && <Button onPress={previous} title="Previous" />}
            {!isLastPage && <Button onPress={submitForm} title="Next" />}
            {isLastPage && <Button onPress={submitForm} title="Submit" />}
          </View>
        </View>
      )}
    </Formik>
  );
}
