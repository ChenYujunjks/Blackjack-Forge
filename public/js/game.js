async function startNewGame() {
  try {
    const response = await fetch('/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        const data = await response.json();
        console.log('New game started:', data);
        //update hands
        updateHands(data.playerHand, data.dealerHand);
        updateGameResult(data)
    } else {
        console.error('Error starting new game:', response.status);
      }
  } catch (error) {
      console.error('Error starting new game:', error);
  }
}

async function hitCard() {
  try {
    const response = await fetch('/hit', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Hit result:', data);
      updateHands(data.playerHand, data.dealerHand);
      if (data.bust) {  // 显示爆牌信息
        updateGameResult({ result: 'Player Busts!' });
      }
    } else {
      console.error('Error hitting card:', response.status);
    }
  } catch (error) {
    console.error('Error hitting card:', error);
  }
}
  
async function stand() {
  try {
    const response = await fetch('/stand', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Stand result:', data);
      updateHands(data.playerHand, data.dealerHand);
      updateGameResult(data);  
    } else {
      console.error('Error standing:', response.status);
    }
  } catch (error) {
    console.error('Error standing:', error);
    showError('Network or server error occurred'); // network or server error
  }
}

function displayCard(containerId, card) {
  const container = document.getElementById(containerId);
  const img = document.createElement('img');
  // 检查是否是隐藏的卡牌
  if (card.suit === 'Hidden' && card.value === 'Card') {
    img.src = 'images/back_of_card.svg';  // 指向牌背的图像
    img.alt = 'Hidden Card';
  } else {
    img.src = `images/${card.value.toLowerCase()}_of_${card.suit.toLowerCase()}.svg`;
    img.alt = `${card.value} of ${card.suit}`;
  }

  img.className = 'card-image';
  container.appendChild(img);
}

function updateHands(playerHand, dealerHand) {
  const playerContainer = document.getElementById('player-hand');
  const dealerContainer = document.getElementById('dealer-hand');
  playerContainer.innerHTML = '';  // clear hands
  dealerContainer.innerHTML = '';

  playerHand.forEach(card => displayCard('player-hand', card));
  dealerHand.forEach(card => displayCard('dealer-hand', card));
}

function updateGameResult(data) {
  const gameResultElement = document.getElementById('game-result');
  if (data.result) {
     //set Timer(,3000) to show dealer hands
    gameResultElement.textContent = data.result;
    // 游戏结束, 显示开始按钮, 隐藏hit和stand按钮
    document.getElementById('start-button').style.display = 'inline-block';
    document.getElementById('hit-button').style.display = 'none';
    document.getElementById('stand-button').style.display = 'none';
  } else {
    gameResultElement.textContent = '';
  }
}

document.getElementById('start-button').addEventListener('click', () => {
  startNewGame();
  document.getElementById('start-button').style.display = 'none';
  document.getElementById('hit-button').style.display = 'inline-block';
  document.getElementById('stand-button').style.display = 'inline-block';
});

document.getElementById('hit-button').addEventListener('click', hitCard);
document.getElementById('stand-button').addEventListener('click', stand);