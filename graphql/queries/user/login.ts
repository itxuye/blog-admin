import gql from 'graphql-tag';

const LOGIN = gql`
  query($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      accessToken
    }
  }
`;

export default LOGIN;
