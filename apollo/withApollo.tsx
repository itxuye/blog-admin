import * as PropTypes from 'prop-types';
import * as React from 'react';

import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { getDataFromTree } from 'react-apollo';

import Head from 'next/head';

import parseCookies from '../util/parseCookies';
import initApollo from './initApollo';

export default (App: any) => {
  //  let disableStylesGeneration = true;

  App.displayName = 'Kandelborg App';
  return class WithData extends React.Component {
    public static displayName = `WithData(${App.displayName})`;

    public static propTypes = {
      apolloState: PropTypes.object.isRequired
    };

    public static async getInitialProps(ctx: any) {
      const {
        Component,
        router,
        ctx: { req, res }
      } = ctx;

      const apollo: any = initApollo(
        {},
        {
          getToken: () => parseCookies(req).token
        }
      );

      ctx.ctx.apolloClient = apollo;

      let appProps: object = {};

      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      if (res && res.finished) {
        // When redirecting, the response is finished.
        // No point in continuing to render
        return {};
      }
      await getDataFromTree(
        <App
          {...appProps}
          Component={Component}
          router={router}
          apolloClient={apollo}
          getDisableStylesGeneration={true}
        />
      );
      // getDataFromTree does not call componentWillUnmount
      // head side effect therefore need to be cleared manually
      Head.rewind();
      // Extract query data from the Apollo's store
      const apolloState: NormalizedCacheObject = apollo.cache.extract();

      return {
        ...appProps,
        apolloState
      };
    }

    // apolloClient doesn't exist yet
    public apolloClient: ApolloClient<NormalizedCacheObject>;

    public pageContext: any = null;
    constructor(props: any) {
      super(props);
      //  disableStylesGeneration = false;
      /*  this.pageContext = getPageContext(); */
      // `getDataFromTree` renders the component first, the client is passed off as a property.
      // After that rendering is done using Next's normal rendering pipeline
      this.apolloClient = initApollo(props.apolloState, {
        getToken: () => parseCookies().token
      });
    }

    public render() {
      return (
        <App
          {...this.props}
          // pageContext={this.pageContext}
          apolloClient={this.apolloClient}
          getDisableStylesGeneration={false}
        />
      );
    }
  };
};
