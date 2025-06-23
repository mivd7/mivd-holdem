/* eslint-disable @typescript-eslint/no-explicit-any */
import { Deck } from "@/lib/deck";
import { Card } from "@/types";

let deck = new Deck();
deck.shuffle();

export const resolvers = {
  Query: {
    newDeck: (): Card[] => {
      deck = new Deck();
      deck.shuffle();
      return deck.cards.map(formatCard);
    },
  },
  Mutation: {
    drawCards: (_: any, { count }: { count: number }): Card[] => {
      const drawn = deck.draw(count);
      return drawn.map(formatCard);
    },
    removeCard: (_: any, { card }: { card: Card }): Card[] => {
      deck.removeCard(card.id);
      return deck.cards;
    },
    resetDeck: () => deck.reset()
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