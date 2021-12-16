const { ApolloServer, gql } = require('apollo-server-lambda');
const { getTeams } = require('../data/repository');

const typeDefs = gql(`
  type Query {
    teams:[Team]
  }

  type Team {
    name: String
    stadium: String!
  } 
`);

const resolvers = {
  Query: {
    teams: () => Promise.resolve(getTeams())
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

exports.graphqlHandler = server.createHandler();
