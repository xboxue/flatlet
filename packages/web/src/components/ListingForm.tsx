import { FormikErrors } from 'formik';
import React from 'react';
import { AmenitiesForm } from './AmenitiesForm';
import { DetailsForm } from './DetailsForm';
import { LocationForm } from './LocationForm';
import { Wizard } from './Wizard';

type Values = typeof initialValues;

export interface ListingFormPageProps {
  validate: (values: Values) => FormikErrors<Values>;
}

const initialValues = {
  address: '',
  apt: '',
  city: '',
  province: '',
  postalCode: '',
  propertyType: '',
  area: '',
  bedrooms: '',
  bathrooms: '',
  amenities: ''
};

export const ListingForm = () => (
  <Wizard<Values>
    initialValues={initialValues}
    onSubmit={values => {
      console.log(values);
    }}
  >
    <LocationForm
      validate={values => {
        const errors: FormikErrors<Values> = {};
        if (!values.address) {
          errors.address = 'Required';
        }
        return errors;
      }}
    />
    <DetailsForm
      validate={values => {
        const errors: FormikErrors<Values> = {};
        if (!values.bedrooms) {
          errors.bedrooms = 'Required';
        }
        return errors;
      }}
    />
    <AmenitiesForm />
  </Wizard>
);
