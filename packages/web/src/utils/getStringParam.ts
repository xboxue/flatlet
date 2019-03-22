import { WithRouterProps } from 'next/router';

export const getStringParam = (
  param: string,
  router: WithRouterProps['router']
) => {
  const result = router && router.query && router.query[param];

  if (typeof result !== 'string') return null;

  return result;
};
