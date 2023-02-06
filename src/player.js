const Ship = require("../src/ship");
const Gameboard = require("../src/gameboard");

const Player = function (name, playerType) {
  const gameboard = Gameboard(10, 10);

  // Boolean to check player turns
  let isPlayerTurn = true;

  // Store and track AI moves
  let computerMoves = [];

  return {
    name,
    playerType,
    gameboard,
    isPlayerTurn,
    computerMoves,

    randomMove() {
      let move = [
        Math.floor(Math.random() * gameboard.height),
        Math.floor(Math.random() * gameboard.width),
      ];

      if (this.computerMoves.length === 0) {
        this.computerMoves.push(move);
        return move;
      }

      for (let i = 0; i < this.computerMoves.length; i++) {
        if (this.computerMoves[i].every((v, i) => v === move[i])) {
          this.randomMove();
        }
      }
      this.computerMoves.push(move);
      return move;
    },

    attack(x, y) {
      let attackResult;
      if (this.playerType === "Player") {
        attackResult = this.gameboard.receiveAttack(x, y);
      } else {
        let move = this.randomMove();
        attackResult = this.gameboard.receiveAttack(move[0], move[1]);
      }
      this.isPlayerTurn = !this.isPlayerTurn;
      return attackResult;
    },
  };
};

module.exports = Player;
