(() => {                    // Esto se llama "patrón módulo" y permite que desde el browser no se pueda acceder a las variables
    'use strict'

    let deck                = [];
    const types             = ['C', 'D', 'H', 'S'],
          specials          = ['J', 'Q', 'K', 'A'];

    // let playerPoints        = 0,
    //     computerPoints      = 0
    let playersPointsDom    = [];

    // HTML references
    const btnNewGame        = document.querySelector('#btnNewGame'),
          btnTakeCard       = document.querySelector('#btnTakeCard'),
          btnFinish         = document.querySelector('#btnFinish');

    //const playerPointsDom   = document.querySelector('#small-player'),
    //      computerPointsDom = document.querySelector('#small-computer');

    const pointsHTML        = document.querySelectorAll('#small')
    
    const playersCardsDiv    = document.querySelectorAll('.cardsDiv');

    // const divPlayerCards    = document.querySelector('#player-cards'),
    //       divComputerCards  = document.querySelector('#computer-cards');

    // this function start the game
    const startGame = (numPlayers = 2) => {
        deck = createDeck();
        for ( let i = 0; i < numPlayers; i++ ) {
            playersPointsDom.push(0);
        }
        console.log(deck);
    }

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
        return _.shuffle(deck)
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

    // computer

    const computerTime = ( minPoints ) => {
        let computerPoints = 0;
        do {
            const card = pickCard();
            computerPoints = pointsCounter(card ,playersPointsDom.length - 1 );

            // computerPoints = computerPoints + cardValue(card);
            // computerPointsDom.innerText = computerPoints;

            renderCard( card, playersPointsDom.length - 1);
            // const imgCard = document.createElement('img');
            // imgCard.classList.add('cards');                           // Also imgCard.className = 'cards'
            // imgCard.src = `assets/cartas/${card}.png`;
            // divComputerCards.append(imgCard);

            if(minPoints > 21 || computerPoints === 21) {
                break
            }
        } while (computerPoints <= minPoints)

        setTimeout(() => {
            if(minPoints === computerPoints ) {
            alert('Empate')
            } else if (minPoints > 21) {
            alert('Lo siento, has pedido esta mano...')
            } else if (computerPoints > minPoints && computerPoints <= 21) {
            alert('Lo siento, has pedido esta mano...')
            } else if (computerPoints > 21) {
            alert('Felicidades, has ganado la mano!')
            }
        }, 20);

    }


    // EVENTS

    btnTakeCard.addEventListener('click', () => {
        const card = pickCard(); 

        const playerPoints = pointsCounter(card, 0);

        renderCard( card, 0);

        // const imgCard = document.createElement('img');
        // imgCard.classList.add('cards');                           // Also imgCard.className = 'cards'
        // imgCard.src = `assets/cartas/${card}.png`;
        // divPlayerCards.append(imgCard)


        console.log('puntos jugador',playerPoints);

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

        



        playersPointsDom[0] = 0;
        pointsHTML[0].innerText = 0;
        playersCardsDiv[0].innerHTML = '';
        
        playersPointsDom[playersPointsDom.length - 1] = 0;
        pointsHTML[1].innerText = 0;
        playersCardsDiv[1].innerHTML = '';
        
        btnTakeCard.disabled = false;
        btnFinish.disabled = false;


        // console.log(playersPointsDom[0], playersPointsDom[playersPointsDom.length - 1])

    })

})();



