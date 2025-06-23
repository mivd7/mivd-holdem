import { Card, Player, Turn } from "@/types";
import PokerGame, { DEFAULT_BIG_BLIND } from "./poker-game";
import { v4 as uuidv4 } from 'uuid';
import { shiftArrayUp } from "./helpers";
import { decideWinner } from "./game-logic";

export default class Round extends PokerGame {
    deck: Card[];
    activePlayers: Player[];
    bigBlind: number;    
    ante: number;
    communityCards: Card[];
    hasFinished: boolean;
    turn?: Turn;
    winners?: Player[];

    constructor(cards: Card[], activePlayers: Player[], bigBlind?: number) {
        super(activePlayers, );
        this.deck = cards;
        this.activePlayers = activePlayers;
        this.communityCards = [];
        this.bigBlind = bigBlind ?? DEFAULT_BIG_BLIND;
        this.hasFinished = false;
        this.ante = 0;
        this.initRound();
    }

    initRound() {
        this.placeMandatoryBets();
        this.drawCommunityCards(3)
        this.turn = this.assignTurn(this.getNextPlayer());
    }

    drawCommunityCards(amount: number) {
        const drawnCards = this.draw(amount)
        drawnCards.forEach((card) => {
            this.communityCards = [...this.communityCards, card]
            this.removeCard(card.id)
        })
        
        this.deck = this.cards;
    };

    getNextPlayer(): Player {
        const players = this.activePlayers;
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
        const smallBlindIndex = this.activePlayers.findIndex(player => player.role === 'small-blind' || player.role === 'dealer');
        const bigBlindIndex = this.activePlayers.findIndex(player => player.role === 'big-blind');
        const smallBlindBet = this.bigBlind / 2;

        this.activePlayers[smallBlindIndex] = {
            ...this.activePlayers[smallBlindIndex],
            bet: smallBlindBet,
            wallet: this.activePlayers[smallBlindIndex].wallet - smallBlindBet,
        }

        this.activePlayers[bigBlindIndex] = {
            ...this.activePlayers[smallBlindIndex],
            bet: this.bigBlind,
            wallet: this.activePlayers[smallBlindIndex].wallet - this.bigBlind
        }

        const totalBet = smallBlindBet + this.bigBlind
        this.pot = this.pot + totalBet;
        this.ante = this.ante + totalBet;
    }

    rotatePlayerRoles() {
        const players = this.activePlayers;
        const dealerIndex = players.findIndex(p => p.role === 'dealer');
        const smallBlindIndex = players.findIndex(p => p.role === 'small-blind');
        const bigBlindIndex = players.findIndex(p => p.role === 'big-blind');

        // Find the next regular after big-blind (wrap around)
        let nextBigBlindIndex = (bigBlindIndex + 1) % players.length;
        while (players[nextBigBlindIndex].role !== 'regular' && nextBigBlindIndex !== bigBlindIndex) {
            nextBigBlindIndex = (nextBigBlindIndex + 1) % players.length;
        }

        // Create a new array with updated roles
       this.activePlayers = players.map((player, index) => {
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
        this.ante = this.ante + amount
        this.activePlayers = shiftArrayUp([...this.activePlayers]);
    }
    
    fold = (player: Player) => {
        this.updatePlayer(player)
        this.activePlayers = this.activePlayers.filter(p => p.id !== player.id)
    }

    end() {
        if(this.activePlayers.length === 1) {
            // only one player left in the round
            this.winners = this.activePlayers
            this.updatePlayer(this.activePlayers[0])
        } else {
            this.winners = decideWinner(this.activePlayers, this.communityCards)
        }
    }
}