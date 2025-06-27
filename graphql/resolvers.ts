/* eslint-disable @typescript-eslint/no-explicit-any */
import { Deck } from "@/lib/deck";
import PokerGame from "@/lib/poker-game";
import { Card, MutationNewGameArgs } from "@/types/generated/graphql";

let deck = new Deck();
deck.shuffle();

const game: PokerGame = new PokerGame(); 

type DrawCardArgs = { count: number };
// type NewGameArgs = RequireFields<MutationNewGameArgs, "players">;

export const resolvers = {
  Query: {
    newDeck: (): Card[] => {
      deck = new Deck();
      deck.shuffle();
      return deck.cards.map(formatCard);
    },
    
  },
  Mutation: {
    drawCards: (_: any, { count }: DrawCardArgs): Card[] => {
      const drawn = deck.draw(count);
      return drawn.map(formatCard);
    },
    newGame: (_: any, {players, bigBlind}: MutationNewGameArgs): PokerGame => {
      game.init(players, bigBlind ?? undefined);
      return game;
    }
    // removeCard: (_: any, { card }: { card: Card }): Card[] => {
    //   deck.removeCard(card.id);
    //   return deck.cards;
    // },
    // resetDeck: () => deck.reset()
  },
};

function formatCard(card: Card) {
  const code = `${card.value[0]}${card.suit[0]}`;
  return {
    ...card,
    code,
    image: `https://deckofcardsapi.com/static/img/${code.toUpperCase()}.png`,
  };
}