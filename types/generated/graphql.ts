import { useMutation, UseMutationOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

function fetcher<TData, TVariables>(endpoint: string, requestInit: RequestInit, query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Card = {
  __typename?: 'Card';
  code: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  suit: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type CardInput = {
  code: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  suit: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  drawCards: Array<Card>;
  newGame: PokerGame;
};


export type MutationDrawCardsArgs = {
  count: Scalars['Int']['input'];
};


export type MutationNewGameArgs = {
  bigBlind?: InputMaybe<Scalars['Int']['input']>;
  players: Array<PlayerInput>;
};

export type Player = {
  __typename?: 'Player';
  bet?: Maybe<Scalars['Int']['output']>;
  hand: Array<Card>;
  hasTurn?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  role?: Maybe<PlayerRole>;
  wallet: Scalars['Int']['output'];
};

export type PlayerInput = {
  bet?: InputMaybe<Scalars['Int']['input']>;
  hand: Array<CardInput>;
  hasTurn?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  role?: InputMaybe<PlayerRole>;
  wallet: Scalars['Int']['input'];
};

export enum PlayerRole {
  BigBlind = 'big_blind',
  Dealer = 'dealer',
  Regular = 'regular',
  SmallBlind = 'small_blind'
}

export type PokerGame = {
  __typename?: 'PokerGame';
  bigBlind: Scalars['Int']['output'];
  bustedPlayers: Array<Player>;
  currentRound?: Maybe<Round>;
  players: Array<Player>;
  pot: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  newDeck: Array<Card>;
};

export type Round = {
  __typename?: 'Round';
  bigBlind: Scalars['Int']['output'];
  communityCards: Array<Card>;
  players: Array<Player>;
  pot: Scalars['Int']['output'];
  turn?: Maybe<Turn>;
  winners?: Maybe<Array<Player>>;
};

export type Turn = {
  __typename?: 'Turn';
  bet: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  player: Player;
};

export type NewGameMutationVariables = Exact<{
  players: Array<PlayerInput> | PlayerInput;
}>;


export type NewGameMutation = { __typename?: 'Mutation', newGame: { __typename?: 'PokerGame', pot: number, bigBlind: number, players: Array<{ __typename?: 'Player', id: string, name: string, wallet: number }>, bustedPlayers: Array<{ __typename?: 'Player', id: string, name: string, wallet: number }>, currentRound?: { __typename?: 'Round', bigBlind: number, pot: number, players: Array<{ __typename?: 'Player', id: string, name: string, wallet: number, role?: PlayerRole | null, bet?: number | null, hasTurn?: boolean | null, hand: Array<{ __typename?: 'Card', suit: string, value: string, code: string, image?: string | null }> }>, communityCards: Array<{ __typename?: 'Card', suit: string, value: string, code: string, image?: string | null }>, turn?: { __typename?: 'Turn', id: string, bet: number, player: { __typename?: 'Player', id: string, name: string } } | null, winners?: Array<{ __typename?: 'Player', id: string, name: string, wallet: number }> | null } | null } };



export const NewGameDocument = `
    mutation NewGame($players: [PlayerInput!]!) {
  newGame(players: $players) {
    players {
      id
      name
      wallet
    }
    pot
    bigBlind
    bustedPlayers {
      id
      name
      wallet
    }
    currentRound {
      players {
        id
        name
        wallet
        hand {
          suit
          value
          code
          image
        }
        role
        bet
        hasTurn
      }
      bigBlind
      pot
      communityCards {
        suit
        value
        code
        image
      }
      turn {
        id
        player {
          id
          name
        }
        bet
      }
      winners {
        id
        name
        wallet
      }
    }
  }
}
    `;

export const useNewGameMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<NewGameMutation, TError, NewGameMutationVariables, TContext>
    ) => {
    
    return useMutation<NewGameMutation, TError, NewGameMutationVariables, TContext>(
      ['NewGame'],
      (variables?: NewGameMutationVariables) => fetcher<NewGameMutation, NewGameMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, NewGameDocument, variables)(),
      options
    )};

useNewGameMutation.getKey = () => ['NewGame'];
