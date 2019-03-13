import { Formik, FormikActions } from 'formik';
import Router from 'next/router';
import React from 'react';
import { Button, View } from 'react-native';

export interface PageProps {
  validationSchema?: any;
  id: string;
}

interface Props<Values> {
  children: React.ReactElement<PageProps>[];
  initialValues: Values;
  id: string;
  path: string;
  onSubmit: (values: Values, formikActions: FormikActions<Values>) => void;
}

export function Wizard<Values>(props: Props<Values>) {
  const pages = React.Children.toArray(props.children);
  const pageMap: { [id: string]: React.ReactElement<PageProps> } = pages.reduce(
    (acc, page) => {
      return {
        ...acc,
        [page.props.id]: page
      };
    },
    {}
  );

  const activePage = pageMap[props.id];
  const activeIndex = pages.findIndex(page => page === activePage);

  const isLastPage = activePage === pages[pages.length - 1];
  const isFirstPage = activePage === pages[0];

  const next = () => {
    Router.push(
      `${props.path}?id=${pages[activeIndex + 1].props.id}`,
      `${props.path}/${pages[activeIndex + 1].props.id}`
    );
  };

  const previous = () => {
    Router.push(
      `${props.path}?id=${pages[activeIndex - 1].props.id}`,
      `${props.path}/${pages[activeIndex - 1].props.id}`
    );
  };

  const handleSubmit = (formValues: Values, bag: FormikActions<Values>) => {
    if (isLastPage) {
      return props.onSubmit(formValues, bag);
    }
    bag.setTouched({});
    bag.setSubmitting(false);
    next();
  };

  return (
    <Formik
      initialValues={props.initialValues}
      onSubmit={handleSubmit}
      validationSchema={activePage.props.validationSchema}
    >
      {({ submitForm }) => (
        <View>
          {activePage}
          <View>
            {!isFirstPage && <Button onPress={previous} title="Previous" />}
            {!isLastPage && <Button onPress={submitForm} title="Next" />}
            {isLastPage && <Button onPress={submitForm} title="Submit" />}
          </View>
        </View>
      )}
    </Formik>
  );
}
