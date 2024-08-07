// Creacion de las variables
const game = document.getElementById('juego'); //
const cells = document.querySelectorAll('.celdas');
const resetButton = document.getElementById('reiniciar');
let currentPlayer = 'X';//el primer jugador sera X
let gameState = Array(9).fill(null); //Array inicializado en null

//Combinaciones de indice las cuales se podria ganar 
const combinacionGanadora = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//Evento cuando se hace click en la celda
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

//Evento para el boton reiniciar
resetButton.addEventListener('click', resetGame);

//
function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (gameState[index] || checkGanador()) return;

    gameState[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkGanador()) {
        alert(`Jugador ${currentPlayer} gana!`);
    } else if (gameState.every(cell => cell)) {
        alert('Empate!');
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkGanador() {
    return combinacionGanadora.some(combination => {
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