import { NewGameMutationVariables, PokerGame } from "@/types/generated/graphql"
import { UseMutateAsyncFunction, UseMutateFunction, UseMutationOptions, UseMutationResult } from "@tanstack/react-query";

// type MutationVariables = NewGameMutationVariables;
// type MutationResults = PokerGame;
// type MutationFetcher<T, V> = (fetcher: (vars: V) => T) => (query: V) =>  Promise<T>;

const asyncMutate: UseMutateAsyncFunction = (vars: unknown, options: UseMutationOptions): Promise<UseMutationResult> => {
    const res = await fetch('http://localhost:3000/api/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        mutation NewGame($players: [PlayerInput!]!) {
          newGame(players: $players) {
            players { id name wallet }
            pot
            bigBlind
            bustedPlayers { id name wallet }
            currentRound {
              players { id name wallet hand { suit value code image } role bet hasTurn }
              bigBlind
              pot
              communityCards { suit value code image }
              turn { id player { id name } bet }
              winners { id name wallet }
            }
          }
        }
      `,
      variables: { players },
    }),
  });

    return result;
}

export default fetcher;