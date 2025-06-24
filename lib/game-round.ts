import { Card, Player, Turn } from "@/types";
import { DEFAULT_BIG_BLIND } from "./poker-game";
import { v4 as uuidv4 } from 'uuid';
import { shiftArrayUp } from "./helpers";
import { decideWinner } from "./game-logic";
import { Deck } from "./deck";

export default class Round extends Deck {
    players: Player[];
    bigBlind: number;    
    pot: number;
    communityCards: Card[];
    turn?: Turn;
    winners?: Player[];
    deck?: Deck;

    constructor() {
        super()
        this.players = [];
        this.communityCards = [];
        this.bigBlind = DEFAULT_BIG_BLIND;
        this.pot = 0;
        this.deck = new Deck();
    }

    init(players: Player[], bigBlind?: number) {
        if(players) this.players = players;
        if(bigBlind) this.bigBlind = bigBlind;
        this.placeMandatoryBets();

        this.drawCommunityCards(3);
        this.turn = this.assignTurn(this.getNextPlayer());
    }

    findPlayerIndex(id: string) { this.players.findIndex(p => p.id === id) }

    dealCardToPlayer(playerId: Player['id'], amount: number) {
        const playerIndex = this.players.findIndex(player => player.id === playerId);
        const [newCard] = this.draw(amount);
        if(playerIndex === -1) { throw new Error()};
        this.players[playerIndex].hand = [...this.players[playerIndex].hand as Card[], newCard]
    }

    drawCommunityCards(amount: number) {
        const drawnCards = this.draw(amount)
        drawnCards.forEach((card) => {
            this.communityCards = [...this.communityCards, card]
            this.removeCard(card.code)
        })
    };

    getNextPlayer(): Player {
        const players = this.players;
        let startIndex = players.findIndex(p => p.hasTurn);
        if (startIndex === -1) {
            startIndex = players.findIndex(p => p.role === 'small-blind');
        }
        if (startIndex === -1) {
            startIndex = players.findIndex(p => p.role === 'dealer');
        }
        // The next player is the one after the reference
        const nextIndex = (startIndex + 1) % players.length;
        return players[nextIndex];
    }

    assignTurn(nextPlayer: Player): Turn {
        if(!this.turn) {
            // first turn of round
            return {
                id: uuidv4(),
                player: nextPlayer,
                bet: 0,
            }
        }

        return {
            ...this.turn,
            player: nextPlayer,
            bet: 0,
        }
    }

    nextTurn() {
        this.drawCommunityCards(1);
        this.rotatePlayerRoles();
        this.assignTurn(this.getNextPlayer())
    }

    placeMandatoryBets() {
        const smallBlindIndex = this.players.findIndex(player => player.role === 'small-blind' || player.role === 'dealer');
        const bigBlindIndex = this.players.findIndex(player => player.role === 'big-blind');
        const smallBlindBet = this.bigBlind / 2;

        this.players[smallBlindIndex] = {
            ...this.players[smallBlindIndex],
            bet: smallBlindBet,
            wallet: this.players[smallBlindIndex].wallet - smallBlindBet,
        }

        this.players[bigBlindIndex] = {
            ...this.players[smallBlindIndex],
            bet: this.bigBlind,
            wallet: this.players[smallBlindIndex].wallet - this.bigBlind
        }

        const totalBet = smallBlindBet + this.bigBlind
        this.pot = this.pot + totalBet;
    }

    rotatePlayerRoles() {
        const players = this.players;
        const dealerIndex = players.findIndex(p => p.role === 'dealer');
        const smallBlindIndex = players.findIndex(p => p.role === 'small-blind');
        const bigBlindIndex = players.findIndex(p => p.role === 'big-blind');

        // Find the next regular after big-blind (wrap around)
        let nextBigBlindIndex = (bigBlindIndex + 1) % players.length;
        while (players[nextBigBlindIndex].role !== 'regular' && nextBigBlindIndex !== bigBlindIndex) {
            nextBigBlindIndex = (nextBigBlindIndex + 1) % players.length;
        }

        // Create a new array with updated roles
       this.players = players.map((player, index) => {
            switch (index) {
                case dealerIndex:
                    return { ...player, role: 'regular' };
                case smallBlindIndex:
                    return { ...player, role: 'dealer' };
                case bigBlindIndex:
                    return { ...player, role: 'small-blind' };
                case nextBigBlindIndex:
                    return { ...player, role: 'big-blind' };
                default:
                    return player;
            }
        });
    }

    updatePlayer(player: Player) {
            // updates the players in PokerGame class after player exited round
            const foundPlayerIndex = this.players.findIndex(player => player.id === player.id);
            if(foundPlayerIndex === -1) {
                throw new Error('error updating player wallet: Player ' + player.id + ' was not found')
            }
            this.players[foundPlayerIndex] = player;
        }

    bet(amount: number) {     
        if(amount < this.bigBlind) {
            throw new Error('betting amount too low')
        }
        
        if(!this.turn?.player) {
            throw new Error('Active player not found')
        }

        this.turn.player.bet = amount;
        this.pot = this.pot + amount;
        this.players = shiftArrayUp([...this.players]);
    }
    
    fold = (player: Player) => {
        this.updatePlayer(player)
        this.players = this.players.filter(p => p.id !== player.id)
    }

    end() {
        if(this.players.length === 1) {
            // only one player left in the round
            this.winners = this.players
            this.updatePlayer(this.players[0])
        } else {
            this.winners = decideWinner(this.players, this.communityCards)
        }
    }
}