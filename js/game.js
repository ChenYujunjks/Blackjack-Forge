// game.js
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
// shuffle
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function createDeck(startValues) {
    let deck = [];

    // generate cards
    suits.forEach(suit => {
        values.forEach(value => {
            deck.push({ suit, value });
        });
    });


    shuffleDeck(deck);

    // if there are matched 
    if (startValues && startValues.length > 0) {
        // deal with startValues
        let formattedStartValues = startValues.map(value => value.trim().toUpperCase());
        // 
        formattedStartValues.reverse().forEach(value => {
            // find the cards matched
            let index = deck.findIndex(card => card.value === value && card.suit === 'Diamonds');
            if (index !== -1) {
                let [card] = deck.splice(index, 1);
                deck.push(card);
            }
        });
    }

    return deck;
}

let playerHand = [], dealerHand = [], deck = [];

function startGame(startValues) {
    deck = createDeck(startValues);
    playerHand = [];
    dealerHand = [];

    // deal two hands
    playerHand.push(deck.pop());
    dealerHand.push(deck.pop());
    playerHand.push(deck.pop());
    dealerHand.push(deck.pop());
 
    console.log("Player's hand:", playerHand);
    console.log("Dealer's hand:", dealerHand);
    
    displayHands()
}

// player hit
function hit() {
    playerHand.push(deck.pop());
    // check if bust
    if (calculateHandValue(playerHand) > 21) {
        console.log("Player busts!");
   
    }
    displayHands()
    //check if bust
    if (calculateHandValue(playerHand) > 21) {
        console.log("Player busts!"); //console output
        document.getElementById('game-result').textContent = 'Player Busts - Dealer Wins!';
        // end game
    }
}
// dealer action
function stand() {
    //dealer strategy
    while (calculateHandValue(dealerHand) < 17) {
        dealerHand.push(deck.pop());
    }
    console.log("Dealer's hand:", dealerHand);
    displayHands(true)

    // count total points
    const playerTotal = calculateHandValue(playerHand);
    const dealerTotal = calculateHandValue(dealerHand);
    
    let result = '';
    if (dealerTotal > 21) {
        result = 'Dealer Busts - Player Wins!';
    } else if (playerTotal > dealerTotal) {
        result = 'Player Wins!';
    } else if (playerTotal < dealerTotal) {
        result = 'Dealer Wins!';
    } else {
        result = 'Push - Tie Game!';
    }
    
    // show the output
    document.getElementById('game-result').textContent = result;
}

function calculateHandValue(hand) {
    let value = 0, aceCount = 0;
    hand.forEach(card => {
        if (card.value === 'A') {
            aceCount++;
            value += 11; // pretend A is 
        } else if (['J', 'Q', 'K'].includes(card.value)) {
            value += 10;
        } else {
            value += parseInt(card.value);
        }
    });

    // if total value is big
    while (value > 21 && aceCount > 0) {
        value -= 10;
        aceCount--;
    }

    return value;
}
function displayHands(showDealerHands = false) {
    const playerHandElement = document.getElementById('player-hand');
    const dealerHandElement = document.getElementById('dealer-hand');

    // clean the hand
    playerHandElement.innerHTML = '';
    dealerHandElement.innerHTML = '';

    // plaer hands
    playerHand.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card'; // 添加这行来应用 .card 类的样式
        cardElement.textContent = `${card.value} of ${card.suit}`;
        playerHandElement.appendChild(cardElement);
    });


    dealerHandElement.innerHTML = ''; 
    if (showDealerHands) {
        // show dealer hands
        dealerHand.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card'; // 添加这行来应用 .card 类的样式
            cardElement.textContent = `${card.value} of ${card.suit}`;
            dealerHandElement.appendChild(cardElement);
        });
    } else {
        // otherwise show one hands
        if (dealerHand.length > 0) {
            const cardElement = document.createElement('div');
            const firstCard = dealerHand[0];
            cardElement.className = 'card'; // 添加这行来应用 .card 类的样式
            cardElement.textContent = `${firstCard.value} of ${firstCard.suit}`;
            dealerHandElement.appendChild(cardElement);
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const startScreen = document.querySelector('.start');
    const gameScreen = document.querySelector('.game');
    const form = document.querySelector('form');
    const input = document.getElementById('startValues');

    // Stop Default Form Action and Start the game
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        startScreen.style.display = 'none';
        const startValues = input.value.split(',');
        console.log('Form Submitted. Starting...')
        startGame(startValues);
        document.querySelector("#hit-button").style.display = "inline-block";
        document.querySelector("#stand-button").style.display = "inline-block";
    });
    document.querySelector("#hit-button").addEventListener("click", function() {
        hit();

    });
    document.querySelector("#stand-button").addEventListener("click", function() {
        stand();

    });
});