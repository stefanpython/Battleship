const Ship = function (length, numOfHits, sunk) {
  return {
    length,
    numOfHits,
    sunk,

    hit() {
      if (!this.sunk) {
        this.numOfHits++;
      }
      if (this.numOfHits === this.length) {
        this.sunk = true;
      }
    },

    isSunk() {
      return this.sunk;
    },
  };
};

module.exports = Ship;

/*
1	Carrier	    5
2	Battleship	4
3	Destroyer	3
4	Submarine	3
5	Patrol Boat 2 */
