import { FormikActions } from 'formik';
import { withRouter } from 'next/router';
import React from 'react';
import { useCreateListing } from 'src/graphql/types';
import { getValidationErrors } from 'src/utils/getValidationErrors';
import * as Yup from 'yup';
import { AmenitiesForm } from './AmenitiesForm';
import { BedBathForm } from './BedBathForm';
import { LocationForm } from './LocationForm';
import { PropertyForm } from './PropertyForm';
import { Wizard } from './Wizard';

type Values = typeof initialValues;

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

const PropertySchema = Yup.object().shape({
  homeType: Yup.string().required('Required'),
  ownerType: Yup.string().required('Required')
});

const BedSchema = Yup.object().shape({
  bedrooms: Yup.number()
    .typeError('Please enter a number')
    .required('Required')
    .positive()
    .integer(),
  bathrooms: Yup.number()
    .typeError('Please enter a number')
    .required('Required')
    .positive()
    .integer(),
  sqft: Yup.number()
    .typeError('Please enter a number')
    .required('Required')
    .positive()
    .integer()
});

export const ListingForm = withRouter(({ router }) => {
  const createListing = useCreateListing();

  const id =
    router && router.query && router.query.id
      ? (router.query.id as string)
      : '';

  const handleSubmit = async (
    { bedrooms, bathrooms, sqft, price, ...rest }: Values,
    { setErrors, setSubmitting }: FormikActions<Values>
  ) => {
    try {
      await createListing({
        variables: {
          input: {
            bedrooms: +bedrooms,
            bathrooms: +bathrooms,
            sqft: +sqft,
            price: +price,
            ...rest
          }
        }
      });
    } catch (error) {
      setErrors(getValidationErrors(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Wizard
      initialValues={initialValues}
      onSubmit={handleSubmit}
      path="/new-listing"
      id={id}
    >
      <PropertyForm id="property" validationSchema={PropertySchema} />
      <BedBathForm id="beds-and-baths" validationSchema={BedSchema} />
      <LocationForm id="location" />
      <AmenitiesForm id="amenities" />
    </Wizard>
  );
});
