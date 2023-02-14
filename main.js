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

eval("var Player = __webpack_require__(/*! ../src/player */ \"./src/player.js\");\nvar Gameboard = __webpack_require__(/*! ../src/gameboard */ \"./src/gameboard.js\");\nvar ai = Player(\"computer\", \"ai\");\nvar player = Player(\"Player\", \"Player\");\nvar aiBoard = Gameboard(10, 10);\nvar playerBoard = Gameboard(10, 10);\naiBoard.placeShip(3, 0, 2, false);\nplayerBoard.placeShip(3, 0, 0, true); // true means horizontal for playerBoard and vertical for aiBoard\n\nfunction playerEventHandler() {\n  var ships = [];\n  var aiSquares = document.querySelectorAll(\".aiContainer .square\");\n  aiSquares.forEach(function (square) {\n    square.addEventListener(\"click\", function () {\n      if (square.classList.contains(\"ship\")) return;\n      var y = this.getAttribute(\"data-row\");\n      var x = this.getAttribute(\"data-column\");\n      var attackResult = player.attack(aiBoard, x, y);\n      if (attackResult.result === \"Hit\") {\n        this.classList.add(\"ship\");\n        this.style.backgroundColor = \"red\";\n      } else {\n        ships.push({\n          y: y,\n          x: x\n        });\n        this.style.backgroundColor = \"grey\";\n      }\n    });\n  });\n}\nfunction aiEventHandler() {\n  var attackResult = ai.attack(playerBoard);\n  var aiShootsSquare = document.querySelector(\"[data-row=\\\"\".concat(ai.computerMoves[ai.computerMoves.length - 1][0], \"\\\"][data-column=\\\"\").concat(ai.computerMoves[ai.computerMoves.length - 1][1], \"\\\"]\"));\n  if (attackResult.result === \"Hit\") {\n    aiShootsSquare.classList.add(\"ship\");\n    aiShootsSquare.style.backgroundColor = \"red\";\n  } else {\n    aiShootsSquare.style.backgroundColor = \"grey\";\n  }\n}\nvar turn = true;\nfunction gameLoop() {\n  if (turn === true) {\n    // Wait for player to make a move\n  } else if (turn === false) {\n    // Call AI's move\n    aiEventHandler();\n    // Change the turn back to player after AI's move\n    turn = !turn;\n  }\n  if (aiBoard.allShipsSunk()) {\n    alert(\"You won the battle\");\n    return;\n  } else if (playerBoard.allShipsSunk()) {\n    alert(\"AI sunk all your ships, du bist kapput!\");\n    return;\n  }\n}\n\n// Call the game loop function after player makes a move\ndocument.addEventListener(\"click\", function () {\n  if (turn === true) {\n    playerEventHandler();\n    turn = !turn;\n    gameLoop();\n  }\n});\nmodule.exports = {\n  playerEventHandler: playerEventHandler,\n  aiEventHandler: aiEventHandler\n};\n\n/*\n  -disable square after clicking it once (add classList maybe)\n  - disable/end game loop after game is ended\n  - try a game with 5 boats on each gameboard\n  - search how to drag and drop boats\n*/\n\n//# sourceURL=webpack://battleship/./src/DOM.js?");

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

eval("var Ship = __webpack_require__(/*! ../src/ship */ \"./src/ship.js\");\n\n// y is row\n// x is colmun\n\nvar Gameboard = function Gameboard(width, height) {\n  // Create a width x height board and fill it with null (empty space)\n  var board = Array.from(Array(width), function () {\n    return Array(height).fill(null);\n  });\n\n  // Array to keep track of placed ships\n  var shipsOnBoard = [];\n\n  // Keep track of missed shots\n  var missedShots = [];\n  return {\n    width: width,\n    height: height,\n    board: board,\n    shipsOnBoard: shipsOnBoard,\n    missedShots: missedShots,\n    get: function get(x, y) {\n      return this.board[y][x];\n    },\n    placeShip: function placeShip(length, x, y, isVertical) {\n      var newBoat = Ship(length, 0, false);\n      if (isVertical) {\n        for (var i = y; i < y + newBoat.length && i < this.height; i++) {\n          this.board[i][x] = newBoat;\n        }\n      } else {\n        for (var _i = x; _i < x + newBoat.length && _i < this.width; _i++) {\n          this.board[y][_i] = newBoat;\n        }\n      }\n      this.shipsOnBoard.push(newBoat);\n    },\n    receiveAttack: function receiveAttack(x, y) {\n      var ship = this.get(x, y);\n      if (ship) {\n        ship.hit();\n        return {\n          result: \"Hit\",\n          missedShots: this.missedShots\n        };\n      } else {\n        this.missedShots.push([x, y]);\n        return {\n          result: \"Miss\",\n          missedShots: this.missedShots\n        };\n      }\n    },\n    allShipsSunk: function allShipsSunk() {\n      var count = 0;\n      var allSunk = false;\n      this.shipsOnBoard.forEach(function (ship) {\n        if (ship.sunk === true) {\n          count++;\n        }\n      });\n      if (count === this.shipsOnBoard.length) {\n        allSunk = true;\n      } else {\n        allSunk = false;\n      }\n      return allSunk;\n    }\n  };\n};\nmodule.exports = Gameboard;\n\n//# sourceURL=webpack://battleship/./src/gameboard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("var Ship = __webpack_require__(/*! ../src/ship */ \"./src/ship.js\");\nvar Gameboard = __webpack_require__(/*! ../src/gameboard */ \"./src/gameboard.js\");\nvar Player = __webpack_require__(/*! ../src/player */ \"./src/player.js\");\nvar createPlayerGrid = __webpack_require__(/*! ../src/playerGrid */ \"./src/playerGrid.js\");\nvar createAiGrid = __webpack_require__(/*! ../src/aiGrid */ \"./src/aiGrid.js\");\nvar dom = __webpack_require__(/*! ../src/DOM */ \"./src/DOM.js\");\n\n// Create two visual gameboards, for ai one and for player one\ncreatePlayerGrid();\ncreateAiGrid();\ndom.playerEventHandler();\n// dom.aiEventHandler();\n\n//# sourceURL=webpack://battleship/./src/index.js?");

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