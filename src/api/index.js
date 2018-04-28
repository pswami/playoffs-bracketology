import gql from "graphql-tag";

export default class Api {
  constructor(client) {
    this.client = client;
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