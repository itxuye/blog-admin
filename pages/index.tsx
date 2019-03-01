import * as React from 'react';
import { Layout } from 'antd';
import cookie from 'cookie';
import { ApolloConsumer } from 'react-apollo';
import { NextContext } from 'next';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';

import redirect from '../apollo/redirect';
import checkLoggedIn from '../apollo/checkLoggedIn';

import Header from '../components/Layouts/header';
import Menu from '../components/Layouts/menu';

const { Content } = Layout;
interface IindexState {
  collapsed: boolean;
}
export default class Index extends React.Component<any, IindexState> {
  constructor(props: any) {
    super(props);
    this.state = {
      collapsed: false
    };
  }
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

  toogleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  public render() {
    const { collapsed } = this.state;
    return (
      <ApolloConsumer>
        {client => (
          <Layout>
            <Menu collapsed={collapsed} />
            <Layout>
              <Header
                collapsed={collapsed}
                toogleCollapsed={() => this.toogleCollapsed}
              />
              <Content
                style={{
                  margin: '24px 16px',
                  padding: 24,
                  background: '#fff',
                  minHeight: '100%'
                }}
              >
                Content
              </Content>
            </Layout>
          </Layout>
        )}
      </ApolloConsumer>
    );
  }
}
