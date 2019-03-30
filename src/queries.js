import { gql } from 'apollo-boost';

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email password: $password) {
      token
      user {
        email
      }
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation signup($email: String!, $password: String!, $username: String!) {
    signup(email: $email password: $password, username: $username) {
      token
      user {
        id
        email
      }
    }
  }
`;

export const CURRENT_USER_QUERY = gql`
  query {
    currentUser {
      email
    }
  }
`;

// export const resolvers = {
//   Query: {
//     currentUser: (_, { text }, { cache }) => {
//       const query = gql`
//         query {
//           currentUser {
//             email
//           }
//         }
//       `;
//       const previous = cache.readQuery({ query });

//       console.log('previous', previous)
//       // if (previous) return previous;

//       // cache.writeData({ data });
//     }
//   },
//   Mutation: {
//     login: (_, { text }, { cache }) => {
//     },
//   }
// }