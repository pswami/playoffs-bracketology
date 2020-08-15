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

export const JOIN_GROUP_MUTATION = gql`
  mutation joinGroup($groupId: ID!, $userId: ID!) {
    joinGroup(groupId: $groupId, userId: $userId) {
      id
      name
      private
      gamePoints
      teamPoints
      type
    }
  }
`;

export const LEAVE_GROUP_MUTATION = gql`
  mutation leaveGroup($groupId: ID!, $userId: ID!) {
    leaveGroup(groupId: $groupId, userId: $userId) {
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
      username
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
      private
      users {
        id
        username
        email
      }

    }
  }
`;

export const GROUP_QUERY = gql`
  query group($id: ID!, $year: Int) {
    group(id: $id) {
      id
      name
      gamePoints
      teamPoints
      private
      users {
        id
        username
        email
        picks(where: { year: $year }) {
          id
          team
          wins
          seriesId
          round
          year
        }
      }

    }
  }
`;

export const PICK_MUTATION = gql`
  mutation upsertPick($data: [PickInput!]!) {
    upsertPick(
      data: $data
    ) {
      id
      seriesId
      team
      wins
      year
    }
  }
`;

export const PICKS_QUERY = gql`
  query picks($userIds: [ID!], $type: String!, $sport: String!, $year: Int!) {
    picks(where: { user: { id_in: $userIds }, type: $type, sport: $sport, year: $year }) {
      id
      team
      wins
      seriesId
      round
      year
      user {
        id
        username
      }
    }
  }
`;

export const NBA_BRACKETS_QUERY = gql`
  query($year: Int) {
    NBABracket(year: $year)
  }
`;
