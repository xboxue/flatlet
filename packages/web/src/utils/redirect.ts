import { ServerResponse } from 'http';
import Router from 'next/router';

export const redirect = (url: string, res: ServerResponse | undefined) => {
  if (res) {
    res.writeHead(302, { Location: url });
    res.end();
  } else {
    Router.push(url);
  }
};
