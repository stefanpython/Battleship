const Gameboard = require("../src/gameboard");

const Player = function (name, playerType) {
  // Boolean to check player turns
  let isPlayerTurn = true;

  // Store and track AI moves
  let computerMoves = [];

  return {
    name,
    playerType,
    isPlayerTurn,
    computerMoves,

    randomMove() {
      // Check if all moves have been taken
      if (this.computerMoves.length === 100) {
        return "All moves have been taken";
      }
      let move = [
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
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

    attack(board, x, y) {
      let attackResult;
      if (this.playerType === "Player") {
        attackResult = board.receiveAttack(x, y);
      } else {
        let move = this.randomMove();
        attackResult = board.receiveAttack(move[0], move[1]);
      }
      this.isPlayerTurn = !this.isPlayerTurn;
      return attackResult;
    },
  };
};

module.exports = Player;
