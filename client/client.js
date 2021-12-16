const fetch = require('node-fetch');
const { createHttpLink } = require('apollo-link-http');
const { InMemoryCache } = require('apollo-cache-inmemory');
const { ApolloClient } = require('apollo-client');
const gql = require('graphql-tag');

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/dev/graphql',
  fetch: fetch
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

const query = gql(`
  query {
    teams {
      ... on Team {
        name
        stadium
      }
    }
  }
`);

(async () => {
  const res = await client.query({ query });
  const json = JSON.stringify(res.data);
  console.log(json);
;
})();

