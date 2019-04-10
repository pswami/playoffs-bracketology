const express = require('express');
const { prisma } = require('./server/generated/prisma-client')
const { GraphQLServer } = require('graphql-yoga')
const resolvers = require('./server/resolvers')
const paths   = require('./config/paths');

const server = new GraphQLServer({
  typeDefs: './server/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    }
  },
});

server.express.get(server.options.endpoint, (req, res, done) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  server.express.use(express.static(paths.appBuild));
  res.sendFile(paths.appBuild + '/index.html');
})

const options = {
  port: process.env.PORT || 4000,
  subscriptions: '/subscriptions',
  playground: '/playground',
};


server.start(options, (url) => console.log(`Server is running on`, url))