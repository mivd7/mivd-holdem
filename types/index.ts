// export type CardColors = 'hearts' | 'diamonds' | 'clovers' | 'spades';

// export type Player = {
//     id: string;
//     name: string;
//     hand?: Card[];
//     role?: PlayerRole;
//     bet?: number;
//     wallet: number;
//     hasTurn?: boolean;
// }

// export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
// export type Value = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

// export interface Card {
//   code: string;
//   suit: Suit;
//   value: Value;
//   image?: string;
// }

// export type PlayerRole = 'dealer' | 'small_blind' | 'big_blind' | 'regular'

// export type Round = {
//     lastBet: number;
//     activePlayers: Player[];
//     drawCount: number;
//     playerTurn: Player;
// }

// export type Turn = {
//   id: string;
//   player: Player;
//   bet: number;
// }

// export type PokerGame = {
//   deck: Card[];
//   activePlayers: Player[];
//   bigBlind: number;    
//   ante: number;
//   communityCards: Card[];
//   hasFinished: boolean;
//   turn?: Turn;
//   winners?: Player[];
// }