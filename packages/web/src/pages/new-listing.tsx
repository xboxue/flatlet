import Head from 'next/head';
import { ListingForm } from 'src/components/ListingForm';
import { withAuth } from 'src/utils/withAuth';

export default withAuth(() => {
  return (
    <div>
      <Head>
        <script
          type="text/javascript"
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCrVBHPYsNGiWKCpIfMVILTHK2BthBOL3o&libraries=places"
        />
      </Head>
      <ListingForm />
    </div>
  );
});
