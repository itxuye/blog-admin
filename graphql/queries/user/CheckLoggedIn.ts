import gql from 'graphql-tag';

const CHECK_LOGGED_IN = gql`
  query CheckLoggedIn {
    me {
      id
      name
      email
      role
    }
  }
`;

export default CHECK_LOGGED_IN;
