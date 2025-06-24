import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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
  hand: Array<Card>;
  hasTurn?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  role: PlayerRole;
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Card: ResolverTypeWrapper<Card>;
  CardInput: CardInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Player: ResolverTypeWrapper<Player>;
  PlayerInput: PlayerInput;
  PlayerRole: PlayerRole;
  PokerGame: ResolverTypeWrapper<PokerGame>;
  Query: ResolverTypeWrapper<{}>;
  Round: ResolverTypeWrapper<Round>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Turn: ResolverTypeWrapper<Turn>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Card: Card;
  CardInput: CardInput;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Player: Player;
  PlayerInput: PlayerInput;
  PokerGame: PokerGame;
  Query: {};
  Round: Round;
  String: Scalars['String']['output'];
  Turn: Turn;
};

export type CardResolvers<ContextType = any, ParentType extends ResolversParentTypes['Card'] = ResolversParentTypes['Card']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  suit?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  drawCards?: Resolver<Array<ResolversTypes['Card']>, ParentType, ContextType, RequireFields<MutationDrawCardsArgs, 'count'>>;
  newGame?: Resolver<ResolversTypes['PokerGame'], ParentType, ContextType, RequireFields<MutationNewGameArgs, 'players'>>;
};

export type PlayerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Player'] = ResolversParentTypes['Player']> = {
  bet?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  hand?: Resolver<Array<ResolversTypes['Card']>, ParentType, ContextType>;
  hasTurn?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['PlayerRole']>, ParentType, ContextType>;
  wallet?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PokerGameResolvers<ContextType = any, ParentType extends ResolversParentTypes['PokerGame'] = ResolversParentTypes['PokerGame']> = {
  bigBlind?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  bustedPlayers?: Resolver<Array<ResolversTypes['Player']>, ParentType, ContextType>;
  currentRound?: Resolver<Maybe<ResolversTypes['Round']>, ParentType, ContextType>;
  players?: Resolver<Array<ResolversTypes['Player']>, ParentType, ContextType>;
  pot?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  newDeck?: Resolver<Array<ResolversTypes['Card']>, ParentType, ContextType>;
};

export type RoundResolvers<ContextType = any, ParentType extends ResolversParentTypes['Round'] = ResolversParentTypes['Round']> = {
  bigBlind?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  communityCards?: Resolver<Array<ResolversTypes['Card']>, ParentType, ContextType>;
  players?: Resolver<Array<ResolversTypes['Player']>, ParentType, ContextType>;
  pot?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  turn?: Resolver<Maybe<ResolversTypes['Turn']>, ParentType, ContextType>;
  winners?: Resolver<Maybe<Array<ResolversTypes['Player']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TurnResolvers<ContextType = any, ParentType extends ResolversParentTypes['Turn'] = ResolversParentTypes['Turn']> = {
  bet?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  player?: Resolver<ResolversTypes['Player'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Card?: CardResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Player?: PlayerResolvers<ContextType>;
  PokerGame?: PokerGameResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Round?: RoundResolvers<ContextType>;
  Turn?: TurnResolvers<ContextType>;
};

