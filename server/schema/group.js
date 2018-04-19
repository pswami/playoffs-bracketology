const { makeExecutableSchema } = require('graphql-tools');

const groups = [
  {
    id: 0,
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling',
    upvote: 0,
  },
  {
    id: 1,
    title: 'Jurassic Park',
    author: 'Michael Crichton',
    upvote: 0,
  },
];

const typeDefs = `
  type Query {
    groups: [Group]
    group(id: ID!): Group
  }

  type Group {
    id: ID,
    title: String,
    author: String,
    upvote: Int
  }

  input GroupInput {
    title: String
    author: String
  }

  type Mutation {
    createGroup ( input: GroupInput ): Group
    updateGroup ( id: ID!, input: GroupInput ): Group
  }
`;

const resolvers = {
  Query: {
    groups: () => groups,
    group: (_, query) => {
      return groups[query.id];
    }
  },
  Mutation: {
    createGroup: (_, { input }) => {
      if (!input) {
        throw new Error(`Couldn't find post with id ${id}`);
      }

      groups.push(input);

      return input;
    },
    updateGroup: (_, { id, input }) => {
      const group = groups[id];

      if (!group) {
        throw new Error(`Couldn't find post with id ${id}`);
      }

      return Object.assign({}, group, input);
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;
