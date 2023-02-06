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

/***/ "./src/aiGrid.js":
/*!***********************!*\
  !*** ./src/aiGrid.js ***!
  \***********************/
/***/ ((module) => {

eval("function createAiGrid() {\n  var container = document.querySelector(\".aiContainer\");\n  var num = 10; // to change and addapt it to gameboard hight\n\n  document.documentElement.style.setProperty(\"--columns-row\", num);\n  for (var i = 0; i < Math.pow(num, 2); i++) {\n    var div = document.createElement(\"div\");\n    div.classList = \"square\";\n    container.appendChild(div);\n  }\n}\nmodule.exports = createAiGrid;\n\n//# sourceURL=webpack://battleship/./src/aiGrid.js?");

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var Ship = __webpack_require__(/*! ../src/ship */ \"./src/ship.js\");\n\n// y is vertical\n// x is orizontal\n\nvar Gameboard = function Gameboard(width, height) {\n  // Create a width x height board and fill it with null (empty space)\n  var board = Array.from(Array(width), function () {\n    return Array(height).fill(null);\n  });\n\n  // Array to keep track of placed ships\n  var shipsOnBoard = [];\n\n  // Keep track of missed shots\n  var missedShots = [];\n  return {\n    width: width,\n    height: height,\n    board: board,\n    shipsOnBoard: shipsOnBoard,\n    missedShots: missedShots,\n    get: function get(x, y) {\n      return this.board[y][x];\n    },\n    placeShip: function placeShip(length, numOfHits, sunk, x, y, isVertical) {\n      var newBoat = Ship(length, numOfHits, sunk);\n      if (isVertical) {\n        for (var i = y; i < y + newBoat.length && i < this.height; i++) {\n          this.board[i][x] = newBoat;\n        }\n      } else {\n        for (var _i = x; _i < x + newBoat.length && _i < this.width; _i++) {\n          this.board[y][_i] = newBoat;\n        }\n      }\n      this.shipsOnBoard.push(newBoat);\n    },\n    receiveAttack: function receiveAttack(x, y) {\n      var ship = this.get(x, y);\n      if (ship) {\n        ship.hit();\n        return {\n          result: \"Hit\",\n          missedShots: missedShots\n        };\n      } else {\n        this.missedShots.push([x, y]);\n        return {\n          result: \"Miss\",\n          missedShots: missedShots\n        };\n      }\n    },\n    allShipsSunk: function allShipsSunk() {\n      var count = 0;\n      var allSunk = false;\n      this.shipsOnBoard.forEach(function (ship) {\n        if (ship.sunk === true) {\n          count++;\n        }\n      });\n      if (count === this.shipsOnBoard.length) {\n        allSunk = true;\n      } else {\n        allSunk = false;\n      }\n      return allSunk;\n    }\n  };\n};\nmodule.exports = Gameboard;\n\n//# sourceURL=webpack://battleship/./src/gameboard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("var Ship = __webpack_require__(/*! ../src/ship */ \"./src/ship.js\");\nvar Gameboard = __webpack_require__(/*! ../src/gameboard */ \"./src/gameboard.js\");\nvar Player = __webpack_require__(/*! ../src/player */ \"./src/player.js\");\nvar createPlayerGrid = __webpack_require__(/*! ../src/playerGrid */ \"./src/playerGrid.js\");\nvar createAiGrid = __webpack_require__(/*! ../src/aiGrid */ \"./src/aiGrid.js\");\ncreatePlayerGrid();\ncreateAiGrid();\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var Ship = __webpack_require__(/*! ../src/ship */ \"./src/ship.js\");\nvar Gameboard = __webpack_require__(/*! ../src/gameboard */ \"./src/gameboard.js\");\nvar Player = function Player(name, playerType) {\n  var gameboard = Gameboard(10, 10);\n\n  // Boolean to check player turns\n  var isPlayerTurn = true;\n\n  // Store and track AI moves\n  var computerMoves = [];\n  return {\n    name: name,\n    playerType: playerType,\n    gameboard: gameboard,\n    isPlayerTurn: isPlayerTurn,\n    computerMoves: computerMoves,\n    randomMove: function randomMove() {\n      var move = [Math.floor(Math.random() * gameboard.height), Math.floor(Math.random() * gameboard.width)];\n      if (this.computerMoves.length === 0) {\n        this.computerMoves.push(move);\n        return move;\n      }\n      for (var i = 0; i < this.computerMoves.length; i++) {\n        if (this.computerMoves[i].every(function (v, i) {\n          return v === move[i];\n        })) {\n          this.randomMove();\n        }\n      }\n      this.computerMoves.push(move);\n      return move;\n    },\n    attack: function attack(x, y) {\n      var attackResult;\n      if (this.playerType === \"Player\") {\n        attackResult = this.gameboard.receiveAttack(x, y);\n      } else {\n        var move = this.randomMove();\n        attackResult = this.gameboard.receiveAttack(move[0], move[1]);\n      }\n      this.isPlayerTurn = !this.isPlayerTurn;\n      return attackResult;\n    }\n  };\n};\nmodule.exports = Player;\n\n//# sourceURL=webpack://battleship/./src/player.js?");

/***/ }),

/***/ "./src/playerGrid.js":
/*!***************************!*\
  !*** ./src/playerGrid.js ***!
  \***************************/
/***/ ((module) => {

eval("function createPlayerGrid() {\n  var container = document.querySelector(\".playerContainer\");\n  var num = 10; // to change and addapt it to gameboard hight\n\n  document.documentElement.style.setProperty(\"--columns-row\", num);\n  for (var i = 0; i < Math.pow(num, 2); i++) {\n    var div = document.createElement(\"div\");\n    div.classList = \"square\";\n    container.appendChild(div);\n  }\n}\nmodule.exports = createPlayerGrid;\n\n//# sourceURL=webpack://battleship/./src/playerGrid.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((module) => {

eval("var Ship = function Ship(length, numOfHits, sunk) {\n  return {\n    length: length,\n    numOfHits: numOfHits,\n    sunk: sunk,\n    hit: function hit() {\n      if (!this.sunk) {\n        this.numOfHits++;\n      }\n      if (this.numOfHits === this.length) {\n        this.sunk = true;\n      }\n    },\n    isSunk: function isSunk() {\n      return this.sunk;\n    }\n  };\n};\nmodule.exports = Ship;\n\n/*\n1\tCarrier\t    5\n2\tBattleship\t4\n3\tDestroyer\t3\n4\tSubmarine\t3\n5\tPatrol Boat 2 */\n\n//# sourceURL=webpack://battleship/./src/ship.js?");

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