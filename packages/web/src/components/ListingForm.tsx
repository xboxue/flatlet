import { FormikActions, FormikErrors } from 'formik';
import React from 'react';
import { useCreateListing } from '../graphql/types';
import { getValidationErrors } from '../utils/getValidationErrors';
import { AmenitiesForm } from './AmenitiesForm';
import { BedBathForm } from './BedBathForm';
import { LocationForm } from './LocationForm';
import { PropertyForm } from './PropertyForm';
import { PageProps, Wizard } from './Wizard';

type Values = typeof initialValues;
export type ListingFormPageProps = PageProps<Values>;

const initialValues = {
  homeType: '',
  ownerType: '',
  bedrooms: '',
  bathrooms: '',
  sqft: '',
  address: '',
  unit: '',
  price: '',
  amenities: [] as string[]
};

export const ListingForm = () => {
  const createListing = useCreateListing();

  const handleSubmit = async (
    { bedrooms, bathrooms, sqft, price, amenities, ...rest }: Values,
    { setErrors, setSubmitting }: FormikActions<Values>
  ) => {
    try {
      const values = {
        bedrooms: +bedrooms,
        bathrooms: +bathrooms,
        sqft: +sqft,
        price: +price,
        ...rest
      };
      await createListing({ variables: { data: values } });
    } catch (error) {
      setErrors(getValidationErrors(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Wizard initialValues={initialValues} onSubmit={handleSubmit}>
      <PropertyForm />
      <BedBathForm
        validate={values => {
          const errors: FormikErrors<Values> = {};
          if (!values.bedrooms) {
            errors.bedrooms = 'Required';
          }
          return errors;
        }}
      />
      <LocationForm
        validate={values => {
          const errors: FormikErrors<Values> = {};
          if (!values.address) {
            errors.address = 'Required';
          }
          return errors;
        }}
      />
      <AmenitiesForm />
    </Wizard>
  );
};
