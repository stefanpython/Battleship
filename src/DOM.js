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
      let y = this.getAttribute("data-row");
      let x = this.getAttribute("data-column");
      player.attack(aiBoard, x, y);

      if (player.attack(aiBoard, x, y).result === "Hit") {
        this.classList.add("ship");
      }
      console.log(player.attack(aiBoard, x, y));
      console.log(player.isPlayerTurn);
    });
  });

  let squares = document.querySelectorAll(".square");
  squares.forEach((square) => {
    square.addEventListener("click", function () {
      let row = this.getAttribute("data-row");
      let column = this.getAttribute("data-column");

      if (this.classList.contains("ship")) {
        this.style.backgroundColor = "red";
        ships.push({ row, column });
      } else {
        this.style.backgroundColor = "grey";
      }

      console.log(ships);
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

/*-console.log playerturn
  - add boat on player board and make computer attack with randomAttack()
  - create a loop to take turns and test game with only a 1 boat on each board
  - display winner
*/
