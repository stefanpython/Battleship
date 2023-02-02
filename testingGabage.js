const board = [];
for (let i = 0; i < height; i++) {
  const row = [];
  for (let j = 0; j < width; j++) {
    row.push(null);
  }
  board.push(row);
}
// Array to keep track of hits and misses
let missedShots = [];

// Keep track of all placed ships on gameboard
let allPlacedShips = [];

return {
  missedShots,
  allPlacedShips,
  board,
  height,
  width,
  placeShip(shipType, length, x, y, isVertical) {
    const newShip = new Ship(shipType, length, 0, false);
    if (isVertical) {
      for (let i = y; i < y + length; i++) {
        this.board[i][x] = newShip;
        allPlacedShips.push(newShip);
      }
    } else {
      for (let i = x; i < x + length; i++) {
        this.board[y][i] = newShip;
        allPlacedShips.push(newShip);
      }
    }
  },

  recieveAttack(x, y) {
    const ship = this.get(x, y);
    if (ship === null) {
      missedShots.push([x, y]);
      return { result: "Miss", missedShots: missedShots };
    }
    ship.hit();
    if (ship.isSunk()) {
      allPlacedShips = allPlacedShips.filter((s) => s !== ship);
    }
    return { result: "Hit", missedShots: missedShots };
  },

  allSunkShips() {
    for (let i = 0; i < this.allPlacedShips.length; i++) {
      if (!this.allPlacedShips[i].isSunk()) {
        return false;
      }
    }
    return true;
  },

  get(x, y) {
    return this.board[y][x];
  },
};

// ---------------------------------------

test("should be place a ship at correct position", () => {
  const myBoard = Gameboard(10, 10);
  myBoard.placeShip("Patrol Boat", 2, 4, 6, true);
  const ship = myBoard.get(4, 6);

  expect(ship.shipType).toBe("Patrol Boat");
  expect(ship.length).toBe(2);
  expect(ship.numOfHits).toBe(0);
  expect(ship.sunk).toBe(false);
});

test("reciveAttack() should return 'Miss' if the attack misses all ships", () => {
  const myBoard = Gameboard(10, 10);
  const result = myBoard.recieveAttack(3, 5);

  expect(result).toEqual({
    result: "Miss",
    missedShots: [[3, 5]],
  });
});

test("reciveAttack() should return 'Hit' if the attack hits a boat", () => {
  const myBoard = Gameboard(10, 10);
  myBoard.placeShip("Patrol Boat", 2, 9, 7, true);
  const result = myBoard.recieveAttack(9, 7);

  expect(result).toEqual({
    result: "Hit",
    missedShots: [],
  });
});

describe("allSunkShips", () => {
  let myBoard;
  beforeEach(() => {
    myBoard = new Gameboard(10, 10);
    myBoard.placeShip("carrier", 5, 0, 0, false);
    myBoard.placeShip("battleship", 4, 1, 1, true);
  });

  it("returns false if all ships are not sunk", () => {
    myBoard.recieveAttack(0, 0);
    myBoard.recieveAttack(0, 1);

    expect(myBoard.allSunkShips()).toBe(false);
  });

  it("returns true if all ships are sunk", () => {
    myBoard.recieveAttack(0, 0);
    myBoard.recieveAttack(0, 1);
    myBoard.recieveAttack(0, 2);
    myBoard.recieveAttack(0, 3);
    myBoard.recieveAttack(0, 4);

    myBoard.recieveAttack(1, 1);
    myBoard.recieveAttack(2, 1);
    myBoard.recieveAttack(3, 1);
    myBoard.recieveAttack(4, 1);

    expect(myBoard.allSunkShips()).toBe(true);
  });
});
