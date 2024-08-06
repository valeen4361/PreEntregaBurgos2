const game = document.getElementById('juego');
const cells = document.querySelectorAll('.celdas');
const resetButton = document.getElementById('reiniciar');
let currentPlayer = 'X';
let gameState = Array(9).fill(null);

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (gameState[index] || checkWinner()) return;

    gameState[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWinner()) {
        alert(`Jugador ${currentPlayer} gana!`);
    } else if (gameState.every(cell => cell)) {
        alert('Empate!');
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

function resetGame() {
    gameState.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
}