import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { FormComponentProps } from 'antd/lib/form';

export interface ILoginFormProps extends FormComponentProps {
  // username: string;
  // password: string;
  apolloClient?: ApolloClient<NormalizedCacheObject>;
}
export interface ILoginFormState {
  loading: boolean;
}