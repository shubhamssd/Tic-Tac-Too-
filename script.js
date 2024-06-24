const cells = document.querySelectorAll('.cell');
const gameBoard = document.getElementById('gameBoard');
const restartButton = document.getElementById('restartButton');
const resultScreen = document.getElementById('resultScreen');
const resultMessage = document.getElementById('resultMessage');
const newGameButton = document.getElementById('newGameButton');

let currentPlayer = 'X';
let boardState = Array(9).fill(null);
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

restartButton.addEventListener('click', restartGame);
newGameButton.addEventListener('click', restartGame);

function handleClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (cell.textContent !== '' || checkWinner()) {
        return;
    }

    cell.textContent = currentPlayer;
    boardState[index] = currentPlayer;

    if (checkWinner()) {
        showResult(`${currentPlayer} wins!`);
        return;
    }

    if (boardState.every(cell => cell !== null)) {
        showResult('It\'s a draw!');
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return boardState[index] === currentPlayer;
        });
    });
}

function showResult(message) {
    resultMessage.textContent = message;
    resultScreen.style.display = 'block';
    gameBoard.style.display = 'none';
}

function restartGame() {
    currentPlayer = 'X';
    boardState = Array(9).fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
    });
    resultScreen.style.display = 'none';
    gameBoard.style.display = 'grid';
}
