const Ship = function (shipType, length, numOfHits, sunk) {
  this.shipType = shipType;
  this.length = length;
  this.numOfHits = numOfHits;
  this.sunk = sunk;

  this.hit = () => {
    this.numOfHits++;
    this.isSunk();
  };

  this.isSunk = () => {
    if (this.numOfHits === this.length) {
      this.sunk = true;
    }
  };
};

module.exports = Ship;

/*
1	Carrier	    5
2	Battleship	4
3	Destroyer	3
4	Submarine	3
5	Patrol Boat 2 */

//   const hit = () => {
//     numOfHits = 0;
//     numOfHits++;
//     return numOfHits;
//   };

//   const isSunk = () => {
//     if (type === "Carrier") {
//     }
//   };

//   return {
//     shipType: shipType,
//     length: length,
//     numOfHits: numOfHits,
//     sunk: sunk,
//   };
