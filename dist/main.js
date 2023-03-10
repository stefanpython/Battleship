/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DOM.js":
/*!********************!*\
  !*** ./src/DOM.js ***!
  \********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var Player = __webpack_require__(/*! ../src/player */ \"./src/player.js\");\nvar Gameboard = __webpack_require__(/*! ../src/gameboard */ \"./src/gameboard.js\");\nvar Ship = __webpack_require__(/*! ../src/ship */ \"./src/ship.js\");\nvar ai = Player(\"computer\", \"ai\");\nvar player = Player(\"Player\", \"Player\");\nvar aiBoard = Gameboard(10, 10);\nvar playerBoard = Gameboard(10, 10);\nfunction placeShipRandom(board) {\n  var length = [5, 4, 3, 3, 2];\n  for (var i = 0; i < 5; i++) {\n    var x = Math.floor(Math.random() * 10);\n    var y = Math.floor(Math.random() * 10);\n    var isVertical = Math.random() < 0.5;\n    var shipOverlaps = false;\n\n    // Check if the ship overlaps with any existing ships\n    var newBoat = Ship(length[i], 0, false);\n    if (isVertical) {\n      for (var j = y; j < y + newBoat.length && j < 10; j++) {\n        if (board.get(x, j) !== null) {\n          shipOverlaps = true;\n          break;\n        }\n      }\n    } else {\n      for (var _j = x; _j < x + newBoat.length && _j < 10; _j++) {\n        if (board.get(_j, y) !== null) {\n          shipOverlaps = true;\n          break;\n        }\n      }\n    }\n\n    // If the ship overlaps, try a new location\n    if (shipOverlaps) {\n      i--;\n      continue;\n    }\n\n    // Check if the ship is going out of the board on the right or bottom\n    while (x + newBoat.length > 10 || y + newBoat.length > 10) {\n      x = Math.floor(Math.random() * 10);\n      y = Math.floor(Math.random() * 10);\n      isVertical = Math.random() < 0.5;\n      newBoat = Ship(length[i], 0, false);\n      if (isVertical) {\n        for (var _j2 = y; _j2 < y + newBoat.length && _j2 < 10; _j2++) {\n          if (board.get(x, _j2) !== null) {\n            shipOverlaps = true;\n            break;\n          }\n        }\n      } else {\n        for (var _j3 = x; _j3 < x + newBoat.length && _j3 < 10; _j3++) {\n          if (board.get(_j3, y) !== null) {\n            shipOverlaps = true;\n            break;\n          }\n        }\n      }\n      if (shipOverlaps) {\n        i--;\n        break;\n      }\n    }\n    board.placeShip(length[i], x, y, isVertical);\n  }\n}\n\n// Place ships randomly on player and ai gameboards\nplaceShipRandom(playerBoard);\nplaceShipRandom(aiBoard);\n\n// Color ships on player board\nfunction colorPlayerShips() {\n  // loop over all ships on the player board\n  playerBoard.shipsOnBoard.forEach(function (ship) {\n    // get the ship locations of the current ship\n    var shipLocations = playerBoard.getShipLocations(ship);\n\n    // loop over each ship location and color the square with that location\n    shipLocations.forEach(function (location) {\n      var square = document.querySelector(\"[data-row=\\\"\".concat(location[0], \"\\\"][data-column=\\\"\").concat(location[1], \"\\\"]\"));\n      square.style.backgroundColor = \"rgb(37, 150, 190)\";\n    });\n  });\n}\nfunction playerEventHandler() {\n  colorPlayerShips();\n  var aiSquares = document.querySelectorAll(\".aiContainer .square\");\n  aiSquares.forEach(function (square) {\n    square.addEventListener(\"click\", function () {\n      if (turn === true) {\n        if (square.classList.contains(\"ship\")) return;\n        var y = this.getAttribute(\"data-row\");\n        var x = this.getAttribute(\"data-column\");\n        var attackResult = player.attack(aiBoard, x, y);\n        if (attackResult.result === \"Hit\") {\n          this.classList.add(\"ship\");\n          this.style.backgroundColor = \"red\";\n        } else {\n          this.style.backgroundColor = \"grey\";\n          this.classList.add(\"clicked\");\n        }\n        if (square.classList.contains(\"clicked\")) {\n          square.style.pointerEvents = \"none\";\n        }\n        turn = !turn;\n        gameLoop();\n      }\n    });\n  });\n}\nfunction aiEventHandler() {\n  var attackResult = ai.attack(playerBoard);\n  var aiShootsSquare = document.querySelector(\"[data-row=\\\"\".concat(ai.computerMoves[ai.computerMoves.length - 1][0], \"\\\"][data-column=\\\"\").concat(ai.computerMoves[ai.computerMoves.length - 1][1], \"\\\"]\"));\n  if (attackResult.result === \"Hit\") {\n    aiShootsSquare.classList.add(\"ship\");\n    aiShootsSquare.style.backgroundColor = \"red\";\n  } else {\n    aiShootsSquare.style.backgroundColor = \"grey\";\n  }\n}\nvar turn = true;\nfunction gameLoop() {\n  if (turn === false) {\n    // Call AI's move\n    aiEventHandler();\n    // Change the turn back to player after AI's move\n    turn = !turn;\n  }\n  if (aiBoard.allShipsSunk()) {\n    document.querySelector(\".displayWinner\").textContent = \"You WON the game!\";\n    turn = null;\n  } else if (playerBoard.allShipsSunk()) {\n    document.querySelector(\".displayWinner\").textContent = \"You LOST the game! Du bist kapput!\";\n    turn = null;\n  }\n}\n\n// Add fade in out to modal and set display to none when game starts\nvar startBtn = document.querySelector(\"#startgame\");\nstartBtn.addEventListener(\"click\", function () {\n  document.querySelector(\"#modal\").classList.toggle(\"fade\");\n  document.querySelector(\"#overlay\").classList.toggle(\"fade\");\n  document.querySelector(\".content\").style.position = \"relative\";\n});\nvar resetBtn = document.getElementById(\"resetBtn\");\nresetBtn.addEventListener(\"click\", function () {\n  location.reload();\n  document.querySelector(\"#overlay\").style.display = \"block\";\n});\nmodule.exports = {\n  playerEventHandler: playerEventHandler,\n  aiEventHandler: aiEventHandler\n};\n\n//# sourceURL=webpack://battleship/./src/DOM.js?");

/***/ }),

/***/ "./src/aiGrid.js":
/*!***********************!*\
  !*** ./src/aiGrid.js ***!
  \***********************/
/***/ ((module) => {

eval("function createAiGrid() {\n  var container = document.querySelector(\".aiContainer\");\n  var num = 10; // to change and addapt it to gameboard hight\n\n  document.documentElement.style.setProperty(\"--columns-row\", num);\n  for (var i = 0; i < Math.pow(num, 2); i++) {\n    var div = document.createElement(\"div\");\n    div.setAttribute(\"data-row\", Math.floor(i / num));\n    div.setAttribute(\"data-column\", i % num);\n    div.classList = \"square\";\n    container.appendChild(div);\n  }\n}\nmodule.exports = createAiGrid;\n\n//# sourceURL=webpack://battleship/./src/aiGrid.js?");

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var Ship = __webpack_require__(/*! ../src/ship */ \"./src/ship.js\");\n\n// y is row\n// x is colmun\n\nvar Gameboard = function Gameboard(width, height) {\n  // Create a width x height board and fill it with null (empty space)\n  var board = Array.from(Array(width), function () {\n    return Array(height).fill(null);\n  });\n\n  // Array to keep track of placed ships\n  var shipsOnBoard = [];\n\n  // Keep track of missed shots\n  var missedShots = [];\n  return {\n    width: width,\n    height: height,\n    board: board,\n    shipsOnBoard: shipsOnBoard,\n    missedShots: missedShots,\n    get: function get(x, y) {\n      return this.board[y][x];\n    },\n    placeShip: function placeShip(length, x, y, isVertical) {\n      var newBoat = Ship(length, 0, false);\n      if (isVertical) {\n        for (var i = y; i < y + newBoat.length && i < this.height; i++) {\n          this.board[i][x] = newBoat;\n        }\n      } else {\n        for (var _i = x; _i < x + newBoat.length && _i < this.width; _i++) {\n          this.board[y][_i] = newBoat;\n        }\n      }\n      this.shipsOnBoard.push(newBoat);\n    },\n    receiveAttack: function receiveAttack(x, y) {\n      var ship = this.get(x, y);\n      if (ship) {\n        ship.hit();\n        return {\n          result: \"Hit\",\n          missedShots: this.missedShots\n        };\n      } else {\n        this.missedShots.push([x, y]);\n        return {\n          result: \"Miss\",\n          missedShots: this.missedShots\n        };\n      }\n    },\n    allShipsSunk: function allShipsSunk() {\n      var count = 0;\n      var allSunk = false;\n      this.shipsOnBoard.forEach(function (ship) {\n        if (ship.sunk === true) {\n          count++;\n        }\n      });\n      if (count === this.shipsOnBoard.length) {\n        allSunk = true;\n      } else {\n        allSunk = false;\n      }\n      return allSunk;\n    },\n    getShipLocations: function getShipLocations(ship) {\n      var locations = [];\n      for (var y = 0; y < this.height; y++) {\n        for (var x = 0; x < this.width; x++) {\n          if (this.board[y][x] === ship) {\n            locations.push([x, y]);\n          }\n        }\n      }\n      return locations;\n    },\n    getBoardSize: function getBoardSize() {\n      return {\n        width: width,\n        height: height\n      };\n    }\n  };\n};\nmodule.exports = Gameboard;\n\n//# sourceURL=webpack://battleship/./src/gameboard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("var Ship = __webpack_require__(/*! ../src/ship */ \"./src/ship.js\");\nvar Gameboard = __webpack_require__(/*! ../src/gameboard */ \"./src/gameboard.js\");\nvar Player = __webpack_require__(/*! ../src/player */ \"./src/player.js\");\nvar createPlayerGrid = __webpack_require__(/*! ../src/playerGrid */ \"./src/playerGrid.js\");\nvar createAiGrid = __webpack_require__(/*! ../src/aiGrid */ \"./src/aiGrid.js\");\nvar dom = __webpack_require__(/*! ../src/DOM */ \"./src/DOM.js\");\ncreatePlayerGrid();\ncreateAiGrid();\ndom.playerEventHandler();\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var Gameboard = __webpack_require__(/*! ../src/gameboard */ \"./src/gameboard.js\");\nvar Player = function Player(name, playerType) {\n  // Boolean to check player turns\n  var isPlayerTurn = true;\n\n  // Store and track AI moves\n  var computerMoves = [];\n  return {\n    name: name,\n    playerType: playerType,\n    isPlayerTurn: isPlayerTurn,\n    computerMoves: computerMoves,\n    randomMove: function randomMove() {\n      // Check if all moves have been taken\n      if (this.computerMoves.length === 100) {\n        return \"All moves have been taken\";\n      }\n      var move = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];\n      if (this.computerMoves.length === 0) {\n        this.computerMoves.push(move);\n        return move;\n      }\n      for (var i = 0; i < this.computerMoves.length; i++) {\n        if (this.computerMoves[i].every(function (v, i) {\n          return v === move[i];\n        })) {\n          return this.randomMove();\n        }\n      }\n      this.computerMoves.push(move);\n      return move;\n    },\n    attack: function attack(board, x, y) {\n      var attackResult;\n      if (this.playerType === \"Player\") {\n        attackResult = board.receiveAttack(x, y);\n      } else {\n        var move = this.randomMove();\n        attackResult = board.receiveAttack(move[0], move[1]);\n      }\n      this.isPlayerTurn = !this.isPlayerTurn;\n      return attackResult;\n    }\n  };\n};\nmodule.exports = Player;\n\n//# sourceURL=webpack://battleship/./src/player.js?");

/***/ }),

/***/ "./src/playerGrid.js":
/*!***************************!*\
  !*** ./src/playerGrid.js ***!
  \***************************/
/***/ ((module) => {

eval("function createPlayerGrid() {\n  var container = document.querySelector(\".playerContainer\");\n  var num = 10; // to change and addapt it to gameboard hight\n\n  document.documentElement.style.setProperty(\"--columns-row\", num);\n  for (var i = 0; i < Math.pow(num, 2); i++) {\n    var div = document.createElement(\"div\");\n    div.classList = \"square\";\n    div.setAttribute(\"data-row\", Math.floor(i / num));\n    div.setAttribute(\"data-column\", i % num);\n    container.appendChild(div);\n  }\n}\nmodule.exports = createPlayerGrid;\n\n//# sourceURL=webpack://battleship/./src/playerGrid.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((module) => {

eval("var Ship = function Ship(length, numOfHits, sunk) {\n  return {\n    length: length,\n    numOfHits: numOfHits,\n    sunk: sunk,\n    hit: function hit() {\n      if (!this.sunk) {\n        this.numOfHits++;\n      }\n      if (this.numOfHits === this.length) {\n        this.sunk = true;\n      }\n    },\n    isSunk: function isSunk() {\n      return this.sunk;\n    }\n  };\n};\nmodule.exports = Ship;\n\n//# sourceURL=webpack://battleship/./src/ship.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;