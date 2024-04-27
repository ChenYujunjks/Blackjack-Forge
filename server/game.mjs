// game.mjs
function createDeck() {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    let deck = [];
    suits.forEach(suit => {
        values.forEach(value => {
            deck.push({ suit, value });
        });
    });
    return shuffleDeck(deck);
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

function dealCards(deck) {
    return { playerHand: [deck.pop(), deck.pop()], dealerHand: [deck.pop(), deck.pop()] };
}

function calculateHandValue(hand) {
    let value = 0, aceCount = 0;
    hand.forEach(card => {
        if (card.value === 'A') {
            aceCount++;
            value += 11;
        } else if (['J', 'Q', 'K'].includes(card.value)) {
            value += 10;
        } else {
            value += parseInt(card.value);
        }
    });
    while (value > 21 && aceCount > 0) {
        value -= 10;
        aceCount--;
    }
    return value;
}

function determineOutcome(playerTotal, dealerTotal) {
    if (playerTotal > 21) {
        return 'Player Busts - Dealer Wins!';
    } else if (dealerTotal > 21) {
        return 'Dealer Busts - Player Wins!';
    } else if (playerTotal > dealerTotal) {
        return 'Player Wins!';
    } else if (playerTotal < dealerTotal) {
        return 'Dealer Wins!';
    } else {
        return 'Push - Tie Game!';
    }
}
// *TODO
function DoubleDeck(){

}
function splitHands(){
    
}

export { createDeck, shuffleDeck, dealCards, calculateHandValue, determineOutcome };
