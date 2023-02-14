const Ship = require("../src/ship");
const Gameboard = require("../src/gameboard");
const Player = require("../src/player");
const createPlayerGrid = require("../src/playerGrid");
const createAiGrid = require("../src/aiGrid");
const dom = require("../src/DOM");

// Create two visual gameboards, for ai one and for player one
createPlayerGrid();
createAiGrid();
dom.playerEventHandler();
// dom.aiEventHandler();
