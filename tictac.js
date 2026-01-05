const boardElement = document.getElementById('board');
const statusText = document.getElementById('status');
const overlay = document.getElementById('overlay');
const resultMessage = document.getElementById('resultMessage');
const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('resetBtn');

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

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

function handleCellClick(e) {
    const clickedCell = e.target.closest('.cell');
    const index = clickedCell.getAttribute('data-index');

    if (gameState[index] !== "" || !gameActive) return;

    gameState[index] = currentPlayer;
    clickedCell.innerText = currentPlayer; 
    clickedCell.classList.add(currentPlayer.toLowerCase());
    checkResult();
}
function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const condition = winningConditions[i];
        let a = gameState[condition[0]];
        let b = gameState[condition[1]];
        let c = gameState[condition[2]];
        if (a === '' || b === '' || c === '') continue;
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        showEndScreen(`Player ${currentPlayer} Wins!`);
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        showEndScreen("It's a Draw!");
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.innerText = `Player ${currentPlayer}'s Turn`;
}

function showEndScreen(msg) {
    resultMessage.innerText = msg;
    overlay.classList.add('show');
}

function resetGame() {
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    statusText.innerText = "Player X's Turn";
    overlay.classList.remove('show');
    cells.forEach(cell => {
        cell.innerText = "";
        cell.classList.remove('x', 'o'); 
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
ializeGame();

