import GoogleMapReact from 'google-map-react';

export const Map = () => (
  <GoogleMapReact
    bootstrapURLKeys={{
      key: 'AIzaSyCrVBHPYsNGiWKCpIfMVILTHK2BthBOL3o'
    }}
    defaultCenter={{ lat: 43.65, lng: -79.38 }}
    defaultZoom={15}
  />
);
