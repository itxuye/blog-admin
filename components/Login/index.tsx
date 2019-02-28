import * as React from 'react';
import cookie from 'cookie';
import { Form, Icon, Input, Button, Row } from 'antd';
import { ApolloConsumer } from 'react-apollo';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import Router from 'next/router';

import login from '../../apollo/login';
import { ILoginFormProps, ILoginFormState } from './index.interface';

import * as styles from './index.less';

class Login extends React.Component<ILoginFormProps, ILoginFormState> {
  public state = {
    loading: false
  };

  public handleSubmit = (
    e: React.MouseEvent,
    apolloClient: ApolloClient<NormalizedCacheObject>
  ) => {
    this.setState({
      loading: true
    });
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { tokenData } = await login(apolloClient, values);
        if (tokenData.login && tokenData.login.accessToken) {
          document.cookie = cookie.serialize(
            'token',
            tokenData.login.accessToken,
            {
              maxAge: 7 * 24 * 60 * 60 // 7 days
            }
          );
          apolloClient.cache.reset().then(() => {
            Router.replace('/');
          });
        }
      }
      this.setState({
        loading: false
      });
    });
  };
  public render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.state;
    return (
      <ApolloConsumer>
        {client => (
          <Form
            onSubmit={(e: React.MouseEvent) => this.handleSubmit(e, client)}
            className={styles['form']}
          >
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                  { required: true, message: 'Please input your username!' }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Please input your Password!' }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Row>
              <Button type="primary" htmlType="submit" loading={loading}>
                Sign in
              </Button>
            </Row>
          </Form>
        )}
      </ApolloConsumer>
    );
  }
}

export default Form.create()(Login);
