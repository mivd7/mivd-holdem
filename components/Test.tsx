import { v4 as uuidv4 } from 'uuid';

const players = [
  { id: uuidv4(), name: 'Alice', cards: [], wallet: 0 },
  { id: uuidv4(), name: 'Bob', cards: [], wallet: 0 },
  { id: uuidv4(), name: 'Charlie', cards: [], wallet: 0 },
  { id: uuidv4(), name: 'Diana', cards: [], wallet: 0 },
];

export default async function NewGameComponent() {
  const res = await fetch('http://localhost:3000/api/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        mutation NewGame($players: [PlayerInput!]!) {
          newGame(players: $players) {
            players { id name wallet }
            pot
            bigBlind
            bustedPlayers { id name wallet }
            currentRound {
              players { id name wallet hand { suit value code image } role bet hasTurn }
              bigBlind
              pot
              communityCards { suit value code image }
              turn { id player { id name } bet }
              winners { id name wallet }
            }
          }
        }
      `,
      variables: { players },
    }),
  });

  const { data, errors } = await res.json();

  // Render or use the data as needed
  return (
    <pre>{JSON.stringify({ data, errors }, null, 2)}</pre>
  );
}