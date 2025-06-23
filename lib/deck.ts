import { Card, Suit, Value } from "@/types";

export class Deck {
  cards: Card[] = [];

  constructor() {
    this.reset();
  }

  reset() {
    const suits: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
    const values: Value[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    this.cards = [];
    for (const suit of suits) {
      for (const value of values) {
        this.cards.push({ 
          id: `${suit}-${value}`, 
          suit, 
          value 
        });
      }
    }
  }

  removeCard(cardId: Card['id']) {
    this.cards = this.cards.filter(card => card.id !== cardId)
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  drawAndRemove(count: number, cardId: Card['id']) {
    this.draw(count);
    this.removeCard(cardId)
  }

  draw(count: number): Card[] {
    return this.cards.splice(0, count);
  }
}