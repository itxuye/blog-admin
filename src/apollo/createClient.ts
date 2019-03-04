import { ApolloClient } from 'apollo-client';
import { from } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import apolloLogger from 'apollo-link-logger';
import { notification } from 'antd';
import cache from './createCache';
import common from '@utils/common';

const isBrowser: boolean = typeof window !== 'undefined';

const create = (initialState: any, { getToken }: any) => {
  const link = from([
    // Create Error linking
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, path }) => {
          if (isBrowser) {
            String(message) === message &&
              notification.error({
                message: path.join(','),
                description: message
              });
          } else {
            console.warn(`${path.join(',')}:  ${message}`);
          }
        });
      }
      if (networkError) {
        // Placeholder
        if (isBrowser) {
          notification.error({
            message: '网络错误',
            description: networkError
          });
        } else {
          console.warn(`[Network error]: ${networkError}`);
        }
      }
    }),
    // Log queries to console
    ...(!common.NODE && common.DEV ? [apolloLogger] : []),

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
    connectToDevTools: common.DEV,
    link: authLink.concat(link),
    queryDeduplication: true,
    ssrMode: Boolean(common.NODE) // Disables forceFetch on the server (so queries are only run once)
  });
};

export default create;
