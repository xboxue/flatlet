import { useEffect, useState } from 'react';

export const usePlacePredictions = () => {
  const [state, setState] = useState({
    autocomplete: null as google.maps.places.AutocompleteService | null,
    sessionToken: null as google.maps.places.AutocompleteSessionToken | null
  });

  useEffect(() => {
    setState({
      autocomplete: new google.maps.places.AutocompleteService(),
      sessionToken: new google.maps.places.AutocompleteSessionToken()
    });
  }, []);

  const getPlacePredictions: google.maps.places.AutocompleteService['getPlacePredictions'] = (
    request,
    callback
  ) => {
    if (!state.autocomplete || !state.sessionToken) {
      throw new Error('Something went wrong');
    }

    state.autocomplete.getPlacePredictions(
      { ...request, sessionToken: state.sessionToken },
      callback
    );
  };

  return getPlacePredictions;
};
