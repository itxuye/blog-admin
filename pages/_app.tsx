import * as React from 'react';

import app, { Container } from 'next/app';

import withGA from 'next-ga';
import Router from 'next/router';

import { NormalizedCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import withApollo from '../apollo/withApollo';

interface IAppProps {
  Component: any;
  pageProps: any;
  req: any;
  apolloClient: ApolloClient<NormalizedCache>;
  apolloState: NormalizedCacheObject;
  router: any;
}

@withGA('UA-108866514-2', Router)
class App extends app<IAppProps> {
  public render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(App);
