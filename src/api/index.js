import { gql } from 'apollo-boost';

export const ME_QUERY = gql`
  query {
    me {
      id
      username
      email
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation signup(
    $email: String!,
    $username: String!
    $password: String!,
  ) {
    signup(
      email: $email,
      username: $username,
      password: $password
    ) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export default class Api {
  constructor(client) {
    this.client = client;
  }

  me = (query) => {
    return this.client.query({
      query: ME_QUERY,
    });
  }

  login = ({ email, password }) => {
    return this.client.mutate({
      mutation: LOGIN_MUTATION,
      variables: { email, password },
    })
  }

  signup = ({ email, username, password }) => {
    return this.client.mutate({
      mutation: SIGNUP_MUTATION,
      variables: { email, username, password },
    })
  }

  getNBABracket() {
    return this.client.query({
      query: gql`
        query {
          NBABracket
        }
      `,
    });
  }
}