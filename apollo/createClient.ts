import { ApolloClient } from 'apollo-client';
import { from } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import apolloLogger from 'apollo-link-logger';

import cache from './createCache';
const isDev = process.env.NODE_ENV === 'development';
const isBrowser: boolean = typeof window !== 'undefined';
const create = (initialState: any, { getToken }: any) => {
  const link = from([
    // Create Error linking
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map((/* { message, locations, path } */) => {
          // Placeholder
        });
      }
      if (networkError) {
        // Placeholder console.warn(`[Network error]: ${networkError}`);
      }
    }),
    // Log queries to console
    ...(isDev ? [apolloLogger] : []),

    new HttpLink({
      credentials: 'same-origin',
      uri: process.env.API_URL
    })
  ]);

  const authLink = setContext((_: any, { headers }: any) => {
    const token: object = getToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    };
  });

  return new ApolloClient({
    cache: cache.restore(initialState || {}),
    connectToDevTools: isDev,
    link: authLink.concat(link),
    queryDeduplication: true,
    ssrMode: !isBrowser // Disables forceFetch on the server (so queries are only run once)
  });
};

export default create;
