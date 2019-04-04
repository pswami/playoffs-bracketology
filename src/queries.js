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

export const CREATE_GROUP_MUTATION = gql`
  mutation createGroup($data: GroupCreateInput!) {
    createGroup(data: $data) {
      id
      name
      private
      gamePoints
      teamPoints
      type
    }
  }
`;

export const CURRENT_USER_QUERY = gql`
  query {
    currentUser {
      id
      email
      groups {
        id
        name
      }
    }
  }
`;

export const GROUPS_QUERY = gql`
  query {
    groups {
      id
      name
      users {
        id
        username
        email
      }

    }
  }
`;

export const GROUP_QUERY = gql`
  query group($id: ID!) {
    group(id: $id) {
      id
      name
      gamePoints
      teamPoints
      users {
        id
        username
        email
      }

    }
  }
`;

export const PICK_MUTATION = gql`
  mutation upsertPick($groupId: ID!, $data: [PickInput!]!) {
    upsertPick(
      groupId: $groupId,
      data: $data
    ) {
      id
      seriesId
      team
      wins
    }
  }
`;

export const PICKS_QUERY = gql`
  query picks($userIds: [ID!], $groupId: ID!) {
    picks(where: { user: { id_in: $userIds }, group: { id: $groupId } }) {
      id
      team
      wins
      seriesId
      user {
        id
        username
      }
    }
  }
`;

export const NBA_BRACKETS_QUERY = gql`
  query {
    NBABracket
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