import gql from 'graphql-tag';

const FETCH_POSTS = gql`
  query GetPosts {
    postsByIsPublishedTrue {
      id
      title
      text
      isPublished
      author {
        name
      }
    }
  }
`;

export default FETCH_POSTS;
