const Ship = require("../src/ship");
const Gameboard = require("../src/gameboard");
const Player = require("../src/player");

describe("Player factory function", () => {
  test("creating a player", () => {
    const player = Player("Angel", "ai");

    expect(player.name).toBe("Angel");
    expect(player.playerType).toBe("ai");
  });
});
