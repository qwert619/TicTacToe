const cells = document.querySelectorAll('.cell');
let Player1 = { number: '1',
    icon: 'X',
    color: 'green',
    color2: '#00FF00',
    wins: 0
 };
let Player2 = { number: '2',
    icon: 'O',
    color: 'blue',
    color2: '#0000FF',
    wins: 0
};
let currentPlayer = Player1;
let gameActive = true;
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restart-btn');
const gameboard = document.getElementById('game-board');
const playerIcons = document.querySelectorAll('.icon');
gameboard.style.display = 'none'; // Hide game board at the start
restartButton.style.display = 'none'; // Hide restart button initially

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
// Hide gameboard initially
document.getElementById('text').textContent = "Player 1: Select Icon"; // Set at start
document.getElementById('background').style.backgroundColor = Player1.color;
let iconSelectionStep = 1;

function updatePlayerIcon(event) {
    const clickedIcon = event.target;
    if (iconSelectionStep === 1) {
        document.getElementById('background').style.backgroundColor = Player2.color;
        Player1.icon = clickedIcon.textContent;
        document.getElementById('text').textContent = "Player 2: Select Icon";
        iconSelectionStep = 2;
    } else if (iconSelectionStep === 2) {
        
        // Prevent Player 2 from picking the same icon as Player 1
        if (clickedIcon.textContent === Player1.icon) {
            alert("Player 2, pick a different icon!");
            return;
        }
        Player2.icon = clickedIcon.textContent;
        document.getElementById('icon-selection').style.display = 'none'; // Hide icon selection
        gameboard.style.display = 'grid'; // Show game board
        document.getElementById('text').textContent = `${Player1.icon} ${Player1.wins} : ${Player2.wins} ${Player2.icon}`;
        statusDisplay.textContent = `Current Player: ${currentPlayer.icon}`;
        document.getElementById('background').style.backgroundColor = currentPlayer.color;
    }
    
}



function handleCellClick(event) {
     // Hide background when game starts
    const clickedCell = event.target;
    const clickedCellIndex = Array.from(cells).indexOf(clickedCell);
    if (cells[clickedCellIndex].textContent !== '' || !gameActive) {
        return;
    }
    cells[clickedCellIndex].textContent = currentPlayer.icon;
    checkForWinner();
    if (gameActive) {
        currentPlayer = currentPlayer === Player1 ? Player2 : Player1;
        statusDisplay.textContent = `Current Player: ${currentPlayer.icon}`;
    }
    document.getElementById('background').style.backgroundColor = currentPlayer.color;
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
        statusDisplay.textContent = `Player ${currentPlayer.icon} Wins!`;
        currentPlayer.wins += 1;
        document.getElementById('text').textContent = `${Player1.icon} ${Player1.wins} : ${Player2.wins} ${Player2.icon}`;
        gameActive = false;
        restartButton.style.display = 'block';
        document.getElementById('clap-audio').play(); // Play clapping sound
        confetti({
            particleCount: 1000,
            spread: 80,
            origin: { y: 1 },
            startVelocity: 60,
            colors: [currentPlayer.color2]
        });
        return;
    }
    let roundDraw = !Array.from(cells).some(cell => cell.textContent === '');
    if (roundDraw) {
        statusDisplay.textContent = 'Game Draw!';
        gameActive = false;
        restartButton.style.display = 'block';
        document.getElementById('boo-audio').play(); // Play booing sound
        return;
    }
}

function restartGame() {
    gameActive = true;
    currentPlayer = Player1;
    cells.forEach(cell => cell.textContent = '');
    restartButton.style.display = 'none';
    // Reset icon selection
    iconSelectionStep = 1;
    Player1.icon = 'X';
    Player2.icon = 'O';
    document.getElementById('icon-selection').style.display = 'block';
    document.getElementById('text').style.display = 'block';
    document.getElementById('text').textContent = "Player 1: Select Icon";
    gameboard.style.display = 'none';
    statusDisplay.textContent = '';
    document.getElementById('background').style.backgroundColor = Player1.color;
}
playerIcons.forEach(icon => icon.addEventListener('click', updatePlayerIcon));
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);