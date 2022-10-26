let deck                = [];
const types             = ['C', 'D', 'H', 'S'];
const specials          = ['J', 'Q', 'K', 'A'];

let playerPoints        = 0
let computerPoints      = 0

// HTML references
const btnNewGame        = document.querySelector('#btnNewGame')
const btnTakeCard       = document.querySelector('#btnTakeCard')
const btnFinish         = document.querySelector('#btnFinish')

const playerPointsDom   = document.querySelector('#small-player');
const computerPointsDom = document.querySelector('#small-computer');

const divPlayerCards    = document.querySelector('#player-cards')
const divComputerCards  = document.querySelector('#computer-cards')



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
    console.log(deck)
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




const cardValue = ( card ) => {
    let value = card.substring(0, card.length - 1);
    isNaN(value) ? value = (value === 'A') ? 11 : 10 : value = +value;
    return value;
}


// EVENTS

btnTakeCard.addEventListener('click', () => {
    const card = pickCard(); 

    playerPoints = playerPoints + cardValue(card);
    playerPointsDom.innerText = playerPoints;

    const imgCard = document.createElement('img');
    imgCard.classList.add('cards');                           // Also imgCard.className = 'cards'
    imgCard.src = `assets/cartas/${card}.png`;
    divPlayerCards.append(imgCard)

    if (playerPoints > 21) {
        console.warn('YOU LOSE');
        btnTakeCard.disabled = true;
    } else if (playerPoints === 21) {
        console.warn('GENIAL');
        btnTakeCard.disabled = true;
    }

    console.log(playerPoints);
});