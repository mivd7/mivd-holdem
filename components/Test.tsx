'use client';

import { useNewGameMutation } from '@/types/generated/graphql';
import { players } from "@/lib/const";

export default function NewGameComponent() {
  const mutation = useNewGameMutation();

  const handleNewGame = () => {
    mutation.mutate({ players });
  };

  console.log('mutation from useNewGameMutation', mutation)

  return (
    <div>
      <button onClick={handleNewGame}>Start New Game</button>
      <pre>{JSON.stringify(mutation.data, null, 2)}</pre>
      <pre>{JSON.stringify(mutation.error, null, 2)}</pre>
    </div>
  );
}