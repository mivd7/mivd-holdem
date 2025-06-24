/* eslint-disable @typescript-eslint/no-explicit-any */
import { Deck } from "@/lib/deck";
import PokerGame from "@/lib/poker-game";
import { Card, Player } from "@/types";

let deck = new Deck();
deck.shuffle();

const game: PokerGame = new PokerGame(); 

type DrawCardArgs = { count: number };
type NewGameArgs = { players: Player[], bigBlind?: number }

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
    // (players: Player[], bigBlind?: number):
    newGame: (_: any, {players, bigBlind}: NewGameArgs): PokerGame => {
      game.init(players, bigBlind);
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