import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import fetch from 'isomorphic-unfetch';

import create from './createClient';

interface IGlobal extends NodeJS.Global {
  fetch: any;
}

// Declaring global here in order to polyfill 'fetch' property
declare var global: IGlobal;

const isBrowser: boolean = typeof window !== 'undefined';

// Polyfill fetch() on the server (used by apollo-client)
if (!isBrowser) {
  global.fetch = fetch;
}

let apolloClient: ApolloClient<NormalizedCacheObject>;

export default function initApollo(
  initialState: any,
  options: object
): ApolloClient<NormalizedCacheObject> {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!isBrowser) {
    return create(initialState, options);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}
