import * as React from 'react';
import { Layout } from 'antd';
import cookie from 'cookie';
import { ApolloConsumer } from 'react-apollo';
import { NextContext } from 'next';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';

import redirect from '@apollo/redirect';
import checkLoggedIn from '@apollo/checkLoggedIn';

import Header from '@components/Layouts/header';
import Menu from '@components/Layouts/menu';

const { Content } = Layout;

const Index: StatelessPage<{}> = () => {
  const [collapsed, toogleCollapsed] = React.useState(false);
  const signout = (apolloClient: ApolloClient<NormalizedCacheObject>) => {
    document.cookie = cookie.serialize('token', '', {
      maxAge: -1 // Expire the cookie immediately
    });
    apolloClient.cache.reset().then(() => {
      // Redirect to a more useful page when signed out
      redirect({} as NextContext, '/login');
    });
  };

  return (
    <ApolloConsumer>
      {client => (
        <Layout>
          <Menu collapsed={collapsed} />
          <Layout>
            <Header
              signout={() => signout(client)}
              collapsed={collapsed}
              toogleCollapsed={() => toogleCollapsed(!collapsed)}
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
};

Index.getInitialProps = async (context: NextContext & IApolloContext) => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);
  if (!loggedInUser.user) {
    redirect(context, '/login');
  }
  return { loggedInUser };
};
export default Index;
