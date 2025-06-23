import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Card {
    suit: String
    value: String
    code: String
    image: String
  }

  type Query {
    newDeck: [Card]
  }

  type Mutation {
    drawCards(count: Int!): [Card]
  }
`