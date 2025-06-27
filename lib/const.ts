import { v4 } from "uuid";

const API_ENDPOINT = '/api/graphql'

const defaultDataSource = {
    endpoint: API_ENDPOINT
}      

const players = [
  { id: v4(), name: 'Alice', hand: [], wallet: 0 },
  { id: v4(), name: 'Bob', hand: [], wallet: 0 },
  { id: v4(), name: 'Charlie', hand: [], wallet: 0 },
  { id: v4(), name: 'Diana', hand: [], wallet: 0 },
];


export {
    API_ENDPOINT,
    defaultDataSource,
    players,
}