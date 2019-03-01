import { ApolloClient } from 'apollo-client';
import { from } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import apolloLogger from 'apollo-link-logger';
import { notification } from 'antd';
import cache from './createCache';
import common from './../util/common';
const create = (initialState: any, { getToken }: any) => {
  const link = from([
    // Create Error linking
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, path }) => {
          notification.error({
            message: path.join(','),
            description: message
          });
        });
      }
      if (networkError) {
        // Placeholder console.warn(`[Network error]: ${networkError}`);
        notification.error({
          message: '网络错误',
          description: networkError
        });
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
