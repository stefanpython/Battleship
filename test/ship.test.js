const Ship = require("../src/ship");

test("should create a new ship obeject", () => {
  const boat = Ship(5, 0, false);
  expect(boat).toEqual({
    length: 5,
    numOfHits: 0,
    sunk: false,
    hit: expect.any(Function),
    isSunk: expect.any(Function),
  });
});

test("should add 1 to number of hits", () => {
  const boat = Ship(5, 0, false);
  boat.hit();
  expect(boat.numOfHits).toBe(1);
});

test("Patrol boat should be sunk after two hits", () => {
  const boat = Ship(2, 0, false);
  boat.hit();
  boat.hit();
  expect(boat.sunk).toBe(true);
});
