import { Player, PlayerRole } from "@/types/generated/graphql";
import { Deck } from "./deck";
import Round from "./game-round";

export const DEFAULT_BIG_BLIND = 10;
// const MAX_PLAYER_AMOUNT = 6;

export default class PokerGame extends Deck {
    players: Player[];
    pot: number;
    bigBlind: number;
    bustedPlayers: Player[];
    currentRound?: Round;

    constructor() {
        super();
        this.players = [];
        this.bigBlind = DEFAULT_BIG_BLIND;
        this.pot = 0;
        this.bustedPlayers = [];
    }

    get round() {
        return this.currentRound;
    }

    init(players: Player[], bigBlind?: number) {
        if(players) this.players = players;
        if(bigBlind) this.bigBlind = bigBlind;
        this.newGame();
    }

    newGame() {
        this.currentRound = new Round()
        this.setPlayerRoles()
        this.currentRound.init(this.players, this.bigBlind)
    }

    setCurrentRound(round: Round) {
        this.currentRound = round;
    }

    bust(player: Player) {
        this.bustedPlayers = [...this.bustedPlayers, player];
        this.players = this.players.filter(player => player.id)
    }

    setPlayerRoles() {
        const playerAmount = this.players.length;
        if(playerAmount <= 1) {
            throw new Error('Need at least two players to play!')
        }
        this.players = this.players.map(this.mapPlayerRoles)
    }

    mapPlayerRoles = (player: Player, index: number) => {
        return {
            ...player,
            role: this.assignRole(index)
        }
    }
    
    assignRole(index: number): PlayerRole {
        switch (index) {
            case 0:
                return PlayerRole.Dealer
            case 1:
                return PlayerRole.SmallBlind
            case 2:
                return PlayerRole.BigBlind    
            default:
                return PlayerRole.Regular
        }
    }
}