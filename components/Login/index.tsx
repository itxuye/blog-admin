import * as React from 'react';
import cookie from 'cookie';
import { Form, Icon, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { ApolloConsumer } from 'react-apollo';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import Router from 'next/router';

import login from '../../apollo/login';
interface LoginFormProps extends FormComponentProps {
  // username: string;
  // password: string;
  apolloClient?: ApolloClient<NormalizedCacheObject>;
}
import * as styles from './index.less';

class Login extends React.Component<LoginFormProps, any> {
  public handleSubmit = (
    e: React.SyntheticEvent,
    apolloClient: ApolloClient<NormalizedCacheObject>
  ) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { tokenData } = await login(apolloClient!, values);
        if (tokenData.login.accessToken) {
          localStorage.setItem('TOKEN', tokenData.login.accessToken);
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
    });
  };
  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <ApolloConsumer>
        {client => (
          <Form
            onSubmit={(e: React.SyntheticEvent) => this.handleSubmit(e, client)}
            className={styles['login-form']}
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
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        )}
      </ApolloConsumer>
    );
  }
}

export default Form.create()(Login);
