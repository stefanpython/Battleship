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
