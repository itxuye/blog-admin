import Router from 'next/router';
import { NextContext } from 'next';

export default (context: NextContext, target: string) => {
  if (context.res) {
    context.res.writeHead(303, { Location: target });
    context.res.end();
  } else {
    Router.replace(target);
  }
};
