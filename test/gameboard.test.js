const Gameboard = require("../src/gameboard");
const Ship = require("../src/ship");

describe("Gameboard factory function", () => {
  let myBoard;

  beforeEach(() => {
    myBoard = Gameboard(10, 10);
  });

  test("should create a 10 X 10 gameboard", () => {
    expect(myBoard.height).toBe(10);
    expect(myBoard.width).toBe(10);
  });

  test("placeShip() should be able to place ship at any specific coordinate", () => {
    myBoard.placeShip(2, 0, false, 4, 6, true);
    const ship = myBoard.get(4, 6);

    expect(ship).toEqual({
      hit: ship.hit,
      isSunk: ship.isSunk,
      length: 2,
      numOfHits: 0,
      sunk: false,
    });
  });

  test("receiveAttack() should return Hit if a boat is hit", () => {
    myBoard.placeShip(2, 0, false, 4, 6, true);

    expect(myBoard.receiveAttack(4, 7)).toEqual({
      missedShots: [],
      result: "Hit",
    });
  });

  test("receiveAttack() should return Miss if a boat is not at attack coordinates", () => {
    myBoard.placeShip(2, 0, false, 4, 6, true);

    expect(myBoard.receiveAttack(2, 3)).toEqual({
      missedShots: [[2, 3]],
      result: "Miss",
    });
  });

  test("allShipsSunk() should return true if all ships are sunk", () => {
    myBoard.placeShip(2, 0, false, 4, 6, true);
    myBoard.placeShip(2, 0, false, 6, 2, false);

    const ship1 = myBoard.get(4, 6);
    const ship2 = myBoard.get(6, 2);

    ship1.hit();
    ship1.hit();
    ship2.hit();
    ship2.hit();

    expect(myBoard.allShipsSunk()).toBe(true);
  });

  test("allShipsSunk() should return false if not all ships are sunk", () => {
    myBoard.placeShip(2, 0, false, 4, 6, true);
    myBoard.placeShip(2, 0, false, 6, 2, false);

    const ship1 = myBoard.get(4, 6);
    const ship2 = myBoard.get(6, 2);

    ship1.hit();
    ship2.hit();

    expect(myBoard.allShipsSunk()).toBe(false);
  });
});
