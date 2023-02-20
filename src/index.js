const Ship = require("../src/ship");
const Gameboard = require("../src/gameboard");
const Player = require("../src/player");
const createPlayerGrid = require("../src/playerGrid");
const createAiGrid = require("../src/aiGrid");
const dom = require("../src/DOM");
const placeBoats = require("../src/drag");

createPlayerGrid();
createAiGrid();
dom.playerEventHandler();
placeBoats();
