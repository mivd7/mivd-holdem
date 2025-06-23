export type CardColors = 'hearts' | 'diamonds' | 'clovers' | 'spades';

export type Player = {
    id: string;
    name: string;
    cards: Card[];
    role: PlayerRole;
    bet?: number;
    wallet: number;
    hasTurn: boolean;
}

export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
export type Value = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

export interface Card {
  id: string;
  suit: Suit;
  value: Value;
}

export type PlayerRole = 'dealer' | 'small-blind' | 'big-blind' | 'regular'

export type Round = {
    lastBet: number;
    activePlayers: Player[];
    drawCount: number;
    playerTurn: Player;
}

export type Turn = {
  id: string;
  player: Player;
  bet: number;
}