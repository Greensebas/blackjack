(() => {                    // Esto se llama "patrón módulo" y permite que desde la consola del browser no se pueda acceder a las variables
    'use strict'            // Esto le dice a js que sea estricto a la hora de evaluar el código (yo podría declarar numeros = [1, 2, 3] sin let, var o const y js lo tomaría igual, pero en 'use strict' esto arroja error)

    let deck                = [];
    const types             = ['C', 'D', 'H', 'S'],
          specials          = ['J', 'Q', 'K', 'A'];

    let playersPointsDom    = [];

    // HTML references
    const btnNewGame        = document.querySelector('#btnNewGame'),
          btnTakeCard       = document.querySelector('#btnTakeCard'),
          btnFinish         = document.querySelector('#btnFinish');

    const pointsHTML        = document.querySelectorAll('#small')
    
    const playersCardsDiv   = document.querySelectorAll('.cardsDiv');


    // this function start the game
    const startGame = (numPlayers = 2) => {
        deck = createDeck();
        playersPointsDom = []
        for ( let i = 0; i < numPlayers; i++ ) {
            playersPointsDom.push(0);
        };

        pointsHTML.forEach( elem => elem.innerText = 0);
        playersCardsDiv.forEach( elem => elem.innerHTML = "");

        btnTakeCard.disabled = false;
        btnFinish.disabled = false;
    };

    // this function creates a new deck
    const createDeck = () => {
        deck = [];

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
        return _.shuffle(deck)                     // Esta función no es nativa del js, la traemos de la librería 'underscore', lo que hace es mezclar el array que se le pasa como parámetro
    }


    // this function pick a card

    const pickCard = () => {
        if (deck.length === 0) {
            throw 'No hay cartas en la baraja'
        };
        return deck.shift();
    };



    // Asign a value to the card
    const cardValue = ( card ) => {
        let value = card.substring(0, card.length - 1);
        isNaN(value) ? value = (value === 'A') ? 11 : 10 : value = +value;
        return value;
    }


    // Turn: 0 = first player ... lastone = computer
    const pointsCounter = (card, turn) => {
        playersPointsDom[turn] = playersPointsDom[turn] + cardValue(card);
        pointsHTML[turn].innerText = playersPointsDom[turn];
        return playersPointsDom[turn]
    }

    const renderCard = (card, turn) => {
        const imgCard = document.createElement('img');
        imgCard.classList.add('cards');                           // Also imgCard.className = 'cards'
        imgCard.src = `assets/cartas/${card}.png`;
        playersCardsDiv[turn].append(imgCard);
    }

    const winner = () => {
        const [minPoints, computerPoints] = playersPointsDom

        setTimeout(() => {
            if(minPoints === computerPoints ) {
            alert('Empate')
            } else if (minPoints > 21) {
            alert('Lo siento, has perdido esta mano...')
            } else if (computerPoints > minPoints && computerPoints <= 21) {
            alert('Lo siento, has perdido esta mano...')
            } else if (computerPoints > 21) {
            alert('Felicidades, has ganado la mano!')
            }
        }, 20);
    }

    // computer

    const computerTime = ( minPoints ) => {
        let computerPoints = 0;
        do {
            const card = pickCard();
            computerPoints = pointsCounter(card ,playersPointsDom.length - 1 );

            renderCard( card, playersPointsDom.length - 1);

            if(minPoints > 21 || computerPoints === 21) {
                break
            }
        } while (computerPoints <= minPoints)

        winner();
    }


    // EVENTS

    btnTakeCard.addEventListener('click', () => {
        const card = pickCard(); 

        const playerPoints = pointsCounter(card, 0);

        renderCard( card, 0);

        if (playerPoints > 21) {
            btnTakeCard.disabled = true;
            btnFinish.disabled = true;
            computerTime(playerPoints);
        } else if (playerPoints === 21) {
            btnTakeCard.disabled = true;
            btnFinish.disabled = true;
            computerTime(playerPoints);
        }
    });

    btnFinish.addEventListener('click', () => {
        btnTakeCard.disabled = true;
        btnFinish.disabled = true;
        computerTime(playersPointsDom[0]);
    })

    btnNewGame.addEventListener('click', () =>{
        startGame();
    })

    return 'Hola Mundo';

})();