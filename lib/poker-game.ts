import { Player, PlayerRole } from "@/types";
import { Deck } from "./deck";
import Round from "./game-round";

export const DEFAULT_BIG_BLIND = 10;
// const MAX_PLAYER_AMOUNT = 6;

export default class PokerGame extends Deck {
    players: Player[];
    isFinished: boolean;
    pot: number;
    bigBlind: number;
    currentRound?: Round | null;

    constructor(players: Player[], bigBlind?: number) {
        super();
        this.players = players
        this.isFinished = false;
        this.pot = 0;
        this.bigBlind = bigBlind ?? DEFAULT_BIG_BLIND;
    }

    get currentPlayers() {
        return this.players;
    }

    newGame() {
        this.setPlayerRoles(this.players);
        this.shuffle();
        this.players = this.players.map(this.dealCards);
        this.startRound();
    }

    startRound() {   
        this.reset();     
        this.currentRound = new Round(this.cards, this.players, )
    }

    findNextPlayerIndex = (players: Player[]) => players.findIndex(player => player.hasTurn) + 1

    dealCards(player: Player) {
        const copyPlayer = {...player}
        for(let i = 0; i < 2; i++) {
            const [newCard] = this.draw(1);
            copyPlayer.cards = [...copyPlayer.cards, newCard]
        }
        return copyPlayer;
    }

    setPlayerRoles(players: Player[]) {
        const playerAmount = players.length;
        if(playerAmount === 1) {
            throw new Error('Need at least two players to play!')
        }
        const copyPlayers = [...players].map(this.mapPlayerRoles)
        this.players = copyPlayers;
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
                return 'dealer'
            case 1:
                return 'small-blind'
            case 2:
                return 'big-blind'    
            default:
                return 'regular'
        }
    }
}