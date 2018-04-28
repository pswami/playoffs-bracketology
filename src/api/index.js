import gql from "graphql-tag";

export default class Api {
  constructor(client) {
    this.client = client;
  }

  login = ({ email, password }) => {
    return this.client.mutate({
      mutation: gql`
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
      `,
      variables: { email, password },
    })
  }

  signup = ({ email, username, password }) => {
    return this.client.mutate({
      mutation: gql`
        mutation signup(
          $email: String!,
          $username: String!
          $password: String!,
        ) {
          login(email: $email, password: $password) {
            token
            user {
              id
              username
              email
            }
          }
        }
      `,
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