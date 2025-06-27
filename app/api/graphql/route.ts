import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { readFileSync } from 'fs';
import { join } from 'path';
import { gql } from 'graphql-tag';
import { resolvers } from '../../../graphql/resolvers';

// Load the schema.graphql file as a string and parse it with gql
const typeDefs = gql(
  readFileSync(join(process.cwd(), 'graphql/schema.graphql'), 'utf8')
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };