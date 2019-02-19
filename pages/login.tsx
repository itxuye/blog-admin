import Login from '../components/Login';
// import redirect from '../../apollo/redirect';
// import checkLoggedIn from '../../apollo/checkLoggedIn';
// import { NextContext } from 'next';

const LoginPage: StatelessPage = () => {
  return <Login />;
};

// LoginPage.getInitialProps = async (context: NextContext & IApolloContext) => {
//   const { loggedInUser } = await checkLoggedIn(context.apolloClient);
//   if (!loggedInUser.user) {
//     redirect(context, '/');
//   }

//   return { loggedInUser };
// };

export default LoginPage;
