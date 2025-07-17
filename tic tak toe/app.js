const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let gameActive = true;
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restart-btn');
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = Array.from(cells).indexOf(clickedCell);
    if (cells[clickedCellIndex].textContent !== '' || !gameActive) {
        return;
    }
    cells[clickedCellIndex].textContent = currentPlayer;
    checkForWinner();
    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Current Player: ${currentPlayer}`;
    }
}

function checkForWinner() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const condition = winningConditions[i];
        const cellA = cells[condition[0]].textContent;
        const cellB = cells[condition[1]].textContent;
        const cellC = cells[condition[2]].textContent;
        if (cellA === '' || cellB === '' || cellC === '') {
            continue;
        }
        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }
    let roundDraw = !Array.from(cells).some(cell => cell.textContent === '');
    if (roundDraw) {
        statusDisplay.textContent = 'Game Draw!';
        gameActive = false;
        return;
    }
}

function restartGame() {
    gameActive = true;
    currentPlayer = 'X';
    statusDisplay.textContent = `Current Player: ${currentPlayer}`;
    cells.forEach(cell => cell.textContent = '');
}
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);