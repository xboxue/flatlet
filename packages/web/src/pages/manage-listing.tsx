import { AppContext } from 'next-with-apollo';
import { UploadPhotoForm } from 'src/components/UploadPhotoForm';
import { redirect } from 'src/utils/redirect';

interface Props {
  id: string;
}

const ManageListing = (props: Props) => {
  return <UploadPhotoForm id={props.id} />;
};

ManageListing.getInitialProps = ({ res, query: { id } }: AppContext) => {
  if (typeof id === 'string') return { id };

  redirect('/', res);
  return {};
};

export default ManageListing;
