'use client'

import { PlayerInput } from '@/types/generated/graphql';
import { v4 as uuidv4 } from 'uuid';
import usePokerGame from '@/hooks/usePokerGame';
import { notFound } from 'next/navigation';
import { DEFAULT_BIG_BLIND } from '@/lib/poker-game';

const players: PlayerInput[] = [
  { id: uuidv4(), name: 'Alice', hand: [], wallet: 0 },
  { id: uuidv4(), name: 'Bob', hand: [], wallet: 0 },
  { id: uuidv4(), name: 'Charlie', hand: [], wallet: 0 },
  { id: uuidv4(), name: 'Diana', hand: [], wallet: 0 },
];

export default function NewGameComponent() {
  const pokerGame = usePokerGame();
  if(!pokerGame) {
    return notFound();
  }
  const { game } = pokerGame;
  const handleNewGameClick = () => {
    const { newGame } = pokerGame.actions;
    const vars = {
      players,
      bigBlind: DEFAULT_BIG_BLIND
    }
    newGame(vars)
  }
  return (
    <div>
      <button onClick={handleNewGameClick}>Start New Game</button>
      {game && <pre>{JSON.stringify(game, null, 2)}</pre>}
    </div>
  );
}