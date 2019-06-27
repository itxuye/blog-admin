import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';

import LOGIN from '@graphql/queries/user/login';

export default (
  apolloClient: ApolloClient<NormalizedCacheObject>,
  variables: any
) =>
  apolloClient
    .query({
      query: LOGIN,
      variables
    })
    .then(({ data }: any) => {
      return { tokenData: data };
    })
    .catch(error => {
      console.log(error);
      // Fail gracefully
      return { tokenData: {} };
    });
