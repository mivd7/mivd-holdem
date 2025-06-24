import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Card {
    suit: String
    value: String
    code: String
    image: String
  }

  type Player {
    id: ID!
    name: String!
    hand: [Card!]
    role: String
    bet: Int
    wallet: Int!
    hasTurn: Boolean
  }

  type Round {
    players: [Player!]!
    bigBlind: Int!
    pot: Int!
    communityCards: [Card!]!
    turn: Turn
    winners: [Player!]
    # deck is omitted, as Deck is likely not a GraphQL type you want to expose directly
  }

  type PokerGame {
    players: [Player!]!
    pot: Int!
    bigBlind: Int!
    bustedPlayers: [Player!]!
    currentRound: Round
  }

  type Turn {
    id: ID!
    player: Player!
    bet: Int!
  }

  input CardInput {
    suit: String
    value: String
    code: String
    image: String
  }

  input PlayerInput {
    id: ID!
    name: String!
    cards: [CardInput!]!
    role: String
    bet: Int
    wallet: Int!
    hasTurn: Boolean
  }

  type Query {
    newDeck: [Card!]!
  }

  type Mutation {
    drawCards(count: Int!): [Card!]!
    newGame(players: [PlayerInput!]!, bigBlind: Int): PokerGame!
  }
`