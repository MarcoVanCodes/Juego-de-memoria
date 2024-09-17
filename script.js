const grid = document.getElementById('grid');
const startButton = document.getElementById('startButton');
const victoriasElement = document.getElementById('victorias');
const gameMessage = document.getElementById('gameMessage');
const messageText = document.getElementById('messageText');
const playAgainButton = document.getElementById('playAgain');

let victorias = 0;
let activeCells = [];
let userSelection = [];
let gameStarted = false;

// Crear la cuadrícula de 5x5
for (let i = 0; i < 25; i++) {
  const cell = document.createElement('div');
  cell.classList.add('grid-item');
  cell.addEventListener('click', () => handleUserClick(i));
  grid.appendChild(cell);
}

// Iniciar el juego
startButton.addEventListener('click', startGame);
playAgainButton.addEventListener('click', startGame);

function startGame() {
  hideGameMessage();
  resetGame();
  activeCells = getRandomCells(8);
  highlightCells(activeCells);
  gameStarted = true;

  setTimeout(() => {
    clearHighlights();
  }, 3000);
}

function resetGame() {
  activeCells = [];
  userSelection = [];
  document.querySelectorAll('.grid-item').forEach(cell => {
    cell.classList.remove('correct', 'wrong');
  });
}

function getRandomCells(num) {
  const cells = [];
  while (cells.length < num) {
    const randomIndex = Math.floor(Math.random() * 25);
    if (!cells.includes(randomIndex)) {
      cells.push(randomIndex);
    }
  }
  return cells;
}

function highlightCells(cells) {
  cells.forEach(index => {
    const cell = grid.children[index];
    cell.classList.add('active');
  });
}

function clearHighlights() {
  document.querySelectorAll('.grid-item').forEach(cell => {
    cell.classList.remove('active');
  });
}

function handleUserClick(index) {
  if (!gameStarted) return;

  const cell = grid.children[index];
  if (userSelection.includes(index)) return;

  userSelection.push(index);

  if (activeCells.includes(index)) {
    cell.classList.add('correct');
  } else {
    cell.classList.add('wrong');
    endGame(false);
    return;  // Terminar si el usuario falla.
  }

  if (userSelection.length === activeCells.length) {
    endGame(true);
  }
}

function endGame(won) {
  gameStarted = false;
  if (won) {
    victorias++;
    victoriasElement.textContent = victorias;
    showGameMessage("¡Felicidades!", true);
  } else {
    showGameMessage("¡Perdiste!", false);
  }
}

function showGameMessage(message, isWin) {
  messageText.textContent = message;
  messageText.classList.toggle('win', isWin);
  messageText.classList.toggle('lose', !isWin);
  gameMessage.classList.remove('d-none');
}

function hideGameMessage() {
  gameMessage.classList.add('d-none');
  grid.classList.remove('d-none');  // Asegúrate de que la cuadrícula sea visible.
}
