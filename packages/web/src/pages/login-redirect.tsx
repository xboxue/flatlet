import { withRouter } from 'next/router';
import { useEffect } from 'react';

export default withRouter(({ router }) => {
  const success = router && router.query && router.query.success;
  useEffect(() => {
    window.opener.open(success === 'true' ? '/' : '/login', '_self');
    window.close();
  });

  return null;
});
