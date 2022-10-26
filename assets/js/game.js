let deck            = [];
const types         = ['C', 'D', 'H', 'S'];
const specials      = ['J', 'Q', 'K', 'A'];

// this function creates a new deck
const createDeck = () => {
    for(let i=2; i<=10; i++) {
        for(let type of types) {
            deck.push(i + type);
        };
    };
    for(let type of types) {
        for(let special of specials) {
            deck.push(special + type)
        };
    };

    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
}

createDeck();


// this function pick a card

const pickCard = () => {
    if (deck.length === 0) {
        throw 'No hay cartas en la baraja'
    };

    let card = deck.shift();
    return card;
};

// pickCard();


const cardValue = ( card ) => {
    let value = card.substring(0, card.length - 1);
    isNaN(value) ? value = (value === 'A') ? 11 : 10 : value = +value;
    return value;
}

let selectedCard = cardValue(pickCard());
console.log({selectedCard});