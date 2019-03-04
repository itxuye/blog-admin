import { NormalizedCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';

import CHECK_LOGGED_IN from '@graphql/queries/user/CheckLoggedIn';

export default (apolloClient: ApolloClient<NormalizedCache>) =>
  apolloClient
    .query({
      query: CHECK_LOGGED_IN
    })
    .then(({ data }: any) => {
      return { loggedInUser: data };
    })
    .catch(() => {
      // Fail gracefully
      return { loggedInUser: {} };
    });
