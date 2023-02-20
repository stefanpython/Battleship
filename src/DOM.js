const Player = require("../src/player");
const Gameboard = require("../src/gameboard");
const Ship = require("../src/ship");

const ai = Player("computer", "ai");
const player = Player("Player", "Player");
const aiBoard = Gameboard(10, 10);
const playerBoard = Gameboard(10, 10);

function placeShipRandom(board) {
  let length = [5, 4, 3, 3, 2];

  for (let i = 0; i < 5; i++) {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    let isVertical = Math.random() < 0.5;

    let shipOverlaps = false;

    // Check if the ship overlaps with any existing ships
    let newBoat = Ship(length[i], 0, false);
    if (isVertical) {
      for (let j = y; j < y + newBoat.length && j < 10; j++) {
        if (board.get(x, j) !== null) {
          shipOverlaps = true;
          break;
        }
      }
    } else {
      for (let j = x; j < x + newBoat.length && j < 10; j++) {
        if (board.get(j, y) !== null) {
          shipOverlaps = true;
          break;
        }
      }
    }

    // If the ship overlaps, try a new location
    if (shipOverlaps) {
      i--;
      continue;
    }

    // Check if the ship is going out of the board on the right or bottom
    while (x + newBoat.length > 10 || y + newBoat.length > 10) {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      isVertical = Math.random() < 0.5;
      newBoat = Ship(length[i], 0, false);
      if (isVertical) {
        for (let j = y; j < y + newBoat.length && j < 10; j++) {
          if (board.get(x, j) !== null) {
            shipOverlaps = true;
            break;
          }
        }
      } else {
        for (let j = x; j < x + newBoat.length && j < 10; j++) {
          if (board.get(j, y) !== null) {
            shipOverlaps = true;
            break;
          }
        }
      }
      if (shipOverlaps) {
        i--;
        break;
      }
    }

    board.placeShip(length[i], x, y, isVertical);
  }
}

// Place ships randomly on player and ai gameboards
placeShipRandom(playerBoard);
placeShipRandom(aiBoard);

// Color ships on player board
function colorPlayerShips() {
  // loop over all ships on the player board
  playerBoard.shipsOnBoard.forEach((ship) => {
    // get the ship locations of the current ship
    let shipLocations = playerBoard.getShipLocations(ship);

    // loop over each ship location and color the square with that location
    shipLocations.forEach((location) => {
      let square = document.querySelector(
        `[data-row="${location[0]}"][data-column="${location[1]}"]`
      );
      square.style.backgroundColor = "blue";
    });
  });
}

function playerEventHandler() {
  colorPlayerShips();
  const aiSquares = document.querySelectorAll(".aiContainer .square");
  aiSquares.forEach((square) => {
    square.addEventListener("click", function () {
      if (turn === true) {
        if (square.classList.contains("ship")) return;

        let y = this.getAttribute("data-row");
        let x = this.getAttribute("data-column");
        let attackResult = player.attack(aiBoard, x, y);

        if (attackResult.result === "Hit") {
          this.classList.add("ship");
          this.style.backgroundColor = "red";
        } else {
          this.style.backgroundColor = "grey";
          this.classList.add("clicked");
        }

        if (square.classList.contains("clicked")) {
          square.style.pointerEvents = "none";
        }

        turn = !turn;
        gameLoop();
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
  if (turn === false) {
    // Call AI's move
    aiEventHandler();
    // Change the turn back to player after AI's move
    turn = !turn;
  }

  if (aiBoard.allShipsSunk()) {
    alert("You won the battle");
    turn = null;
  } else if (playerBoard.allShipsSunk()) {
    alert("AI sunk all your ships, du bist kapput!");
    turn = null;
  }
}

module.exports = {
  playerEventHandler: playerEventHandler,
  aiEventHandler: aiEventHandler,
};

/*
  - disable/end game loop after winner is alerted
  - try a game with 5 boats on each gameboard
  - search how to drag and drop boats
*/
