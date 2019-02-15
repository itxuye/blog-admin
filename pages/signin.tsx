import React from 'react';
import Link from 'next/link';
import { NextContext } from 'next';

import redirect from '../apollo/redirect';
import checkLoggedIn from '../apollo/checkLoggedIn';

export default class Signin extends React.Component {
  static async getInitialProps(context: NextContext & IApolloContext) {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient);

    if (loggedInUser.user) {
      // Already signed in? No need to continue.
      // Throw them back to the main page
      redirect(context, '/');
    }

    return {};
  }

  render() {
    return (
      <React.Fragment>
        {/* SigninBox handles all login logic. */}
        <hr />
        New?{' '}
        <Link prefetch href="/create-account">
          <a>Create account</a>
        </Link>
      </React.Fragment>
    );
  }
}
