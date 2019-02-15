import gql from 'graphql-tag';

const CHECK_LOGGED_IN = gql`
  query {
    user {
      username
    }
  }
`;

export default CHECK_LOGGED_IN;
