const Player = require("../src/player");
const Gameboard = require("../src/gameboard");

const ai = Player("computer", "ai");
const player = Player("Player", "Player");
const aiBoard = Gameboard(10, 10);
const playerBoard = Gameboard(10, 10);

aiBoard.placeShip(3, 0, 2, false);
playerBoard.placeShip(3, 0, 0, true); // true means horizontal for playerBoard and vertical for aiBoard

function playerEventHandler() {
  const ships = [];

  const aiSquares = document.querySelectorAll(".aiContainer .square");
  aiSquares.forEach((square) => {
    square.addEventListener("click", function () {
      if (square.classList.contains("ship")) return;

      let y = this.getAttribute("data-row");
      let x = this.getAttribute("data-column");
      let attackResult = player.attack(aiBoard, x, y);

      if (attackResult.result === "Hit") {
        this.classList.add("ship");
        this.style.backgroundColor = "red";
      } else {
        ships.push({ y, x });
        this.style.backgroundColor = "grey";
      }
    });
  });
}

function aiEventHandler() {
  let attackResult = ai.attack(playerBoard);

  let aiShootsSquare = document.querySelector(
    `[data-row="${
      ai.computerMoves[ai.computerMoves.length - 1][0]
    }"][data-column="${ai.computerMoves[ai.computerMoves.length - 1][1]}"]`
  );

  if (attackResult.result === "Hit") {
    aiShootsSquare.classList.add("ship");
    aiShootsSquare.style.backgroundColor = "red";
  } else {
    aiShootsSquare.style.backgroundColor = "grey";
  }
}

let turn = true;

function gameLoop() {
  if (turn === true) {
    // Wait for player to make a move
  } else if (turn === false) {
    // Call AI's move
    aiEventHandler();
    // Change the turn back to player after AI's move
    turn = !turn;
  }

  if (aiBoard.allShipsSunk()) {
    alert("You won the battle");
    return;
  } else if (playerBoard.allShipsSunk()) {
    alert("AI sunk all your ships, du bist kapput!");
    return;
  }
}

// Call the game loop function after player makes a move
document.addEventListener("click", function () {
  if (turn === true) {
    playerEventHandler();
    turn = !turn;
    gameLoop();
  }
});

module.exports = {
  playerEventHandler: playerEventHandler,
  aiEventHandler: aiEventHandler,
};

/*
  -disable square after clicking it once (add classList maybe)
  - disable/end game loop after game is ended
  - try a game with 5 boats on each gameboard
  - search how to drag and drop boats
*/
