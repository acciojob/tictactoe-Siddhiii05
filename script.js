//your JS code here. If required.
const submitBtn = document.getElementById("submit");
const startScreen = document.getElementById("start-screen");
const game = document.getElementById("game");
const message = document.querySelector(".message");

let player1 = "";
let player2 = "";

let currentPlayer = "X";
let gameOver = false;

submitBtn.addEventListener("click", function () {
    player1 = document.getElementById("player-1").value;
    player2 = document.getElementById("player-2").value;

    if (player1 === "" || player2 === "") {
        alert("Enter both player names");
        return;
    }

    startScreen.style.display = "none";
    game.style.display = "block";

    message.textContent = `${player1}, you're up`;
});

const cells = document.querySelectorAll(".cell");

cells.forEach(cell => {
    cell.addEventListener("click", playGame);
});

function playGame() {

    if (gameOver || this.textContent !== "") return;

    this.textContent = currentPlayer;

    if (checkWinner()) {
        let winner = currentPlayer === "X" ? player1 : player2;
        message.textContent = `${winner} congratulations you won!`;
        gameOver = true;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    message.textContent =
        currentPlayer === "X"
            ? `${player1}, you're up`
            : `${player2}, you're up`;
}

function checkWinner() {

    const board = [];

    cells.forEach(cell => board.push(cell.textContent));

    const wins = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    for (let combo of wins) {

        const [a,b,c] = combo;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[b] === board[c]
        ) {
            return true;
        }
    }

    return false;
}