import { CardColors } from "../types";

const allCards: Record<CardColors, string[]> = {
    hearts: ['ace', 'king', 'queen', 'jack', '10', '9', '8', '7', '6', '5', '4', '3', '2'],
    diamonds: ['ace', 'king', 'queen', 'jack', '10', '9', '8', '7', '6', '5', '4', '3', '2'],
    clovers: ['ace', 'king', 'queen', 'jack', '10', '9', '8', '7', '6', '5', '4', '3', '2'],
    spades: ['ace', 'king', 'queen', 'jack', '10', '9', '8', '7', '6', '5', '4', '3', '2']
}

const mapCardTypes = (type: CardColors) => {
    const cardsByType = allCards[type];
    return cardsByType
            .reverse()
            .map((cardName, i) => ({
                id: `${type}-${cardName}`,
                name: cardName,
                value: i + 1
            }))
}

const cardTypes = Object.keys(allCards) as CardColors[];
const cards = cardTypes.flatMap(mapCardTypes);
const MINIMUM_PLAY_AMOUNT = 5;

const players = [
    {name: 'Henk', cards: [], role: '', money: MINIMUM_PLAY_AMOUNT},
    {name: 'Piet', cards: [], role: '', money: MINIMUM_PLAY_AMOUNT},
    {name: 'Claas', cards: [], role: '', money: MINIMUM_PLAY_AMOUNT},
    {name: 'Hein', cards: [], role: '', money: MINIMUM_PLAY_AMOUNT}
]

export {
    cards,
    players
}
