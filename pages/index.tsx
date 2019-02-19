import React from 'react';
import cookie from 'cookie';
import { ApolloConsumer } from 'react-apollo';
import { NextContext } from 'next';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import redirect from '../apollo/redirect';
import checkLoggedIn from '../apollo/checkLoggedIn';
export default class Index extends React.Component<any> {
  static async getInitialProps(context: NextContext & IApolloContext) {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient);
    if (!loggedInUser.user) {
      // If not signed in, send them somewhere more useful
      redirect(context, '/login');
    }

    return { loggedInUser };
  }

  signout = (apolloClient: ApolloClient<NormalizedCacheObject>) => () => {
    document.cookie = cookie.serialize('token', '', {
      maxAge: -1 // Expire the cookie immediately
    });

    // Force a reload of all the current queries now that the user is
    // logged in, so we don't accidentally leave any state around.
    apolloClient.cache.reset().then(() => {
      // Redirect to a more useful page when signed out
      redirect({} as NextContext, '/login');
    });
  };

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <div>
            {/* Hello {this.props.loggedInUser.user.name}!<br /> */}
            <button onClick={this.signout(client)}>Sign out</button>
          </div>
        )}
      </ApolloConsumer>
    );
  }
}