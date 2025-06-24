import { Card, Suit, Value } from "@/types";

export class Deck {
  cards: Card[];
  suits: Suit[];
  values: Value[];

  constructor() {
    this.cards = [];
    this.suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    this.values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    this.#init();
  }

  #init() {
    this.cards = [];
    for (const suit of this.suits) {
      for (const value of this.values) {
        this.cards.push({
          code: `${suit}-${value}`,
          suit, 
          value 
        });
      }
    }
  }

  removeCard(cardCode: string) {
    this.cards = this.cards.filter(card => card.code !== cardCode)
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  drawAndRemove(count: number) {
    const drawn = this.draw(count);
    drawn.forEach(card => this.removeCard(card.code))

  }

  draw(count: number): Card[] {
    return this.cards.splice(0, count);
  }
}