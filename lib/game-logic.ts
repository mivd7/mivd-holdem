import { Card, Player } from '@/types/generated/graphql';
import { Hand } from 'pokersolver';


function toSolverCard(card: Card): string {
  // Convert to format like 'As' (Ace of spades), 'Td' (Ten of diamonds), etc.
  const valueMap: Record<string, string> = { '10': 'T', 'J': 'J', 'Q': 'Q', 'K': 'K', 'A': 'A' };
  const suitMap: Record<string, string> = { spades: 's', hearts: 'h', diamonds: 'd', clubs: 'c' };
  const value = valueMap[card.value] || card.value;
  const suit = suitMap[card.suit];
  return `${value}${suit}`;
}

export function decideWinner(players: Player[], communityCards: Card[]) {
  const hands = players.map(player => {
    const allCards = [...player.hand, ...communityCards].map(toSolverCard);
    const hand = Hand.solve(allCards);
    return { player, hand };
  });

  const winners = Hand.winners(hands.map(h => h.hand));
  // Find the winning player(s)
  return hands.filter(h => winners.includes(h.hand)).map(h => h.player);
}