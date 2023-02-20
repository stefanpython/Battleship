const Ship = require("../src/ship");

// y is row
// x is colmun

const Gameboard = function (width, height) {
  // Create a width x height board and fill it with null (empty space)
  let board = Array.from(Array(width), () => Array(height).fill(null));

  // Array to keep track of placed ships
  let shipsOnBoard = [];

  // Keep track of missed shots
  let missedShots = [];

  return {
    width,
    height,
    board,
    shipsOnBoard,
    missedShots,

    get(x, y) {
      return this.board[y][x];
    },

    placeShip(length, x, y, isVertical) {
      const newBoat = Ship(length, 0, false);

      if (isVertical) {
        for (let i = y; i < y + newBoat.length && i < this.height; i++) {
          this.board[i][x] = newBoat;
        }
      } else {
        for (let i = x; i < x + newBoat.length && i < this.width; i++) {
          this.board[y][i] = newBoat;
        }
      }
      this.shipsOnBoard.push(newBoat);
    },

    receiveAttack(x, y) {
      let ship = this.get(x, y);

      if (ship) {
        ship.hit();
        return { result: "Hit", missedShots: this.missedShots };
      } else {
        this.missedShots.push([x, y]);
        return { result: "Miss", missedShots: this.missedShots };
      }
    },

    allShipsSunk() {
      let count = 0;
      let allSunk = false;

      this.shipsOnBoard.forEach((ship) => {
        if (ship.sunk === true) {
          count++;
        }
      });

      if (count === this.shipsOnBoard.length) {
        allSunk = true;
      } else {
        allSunk = false;
      }
      return allSunk;
    },

    getShipLocations(ship) {
      const locations = [];

      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          if (this.board[y][x] === ship) {
            locations.push([x, y]);
          }
        }
      }

      return locations;
    },

    getBoardSize() {
      return { width, height };
    },
  };
};

module.exports = Gameboard;
