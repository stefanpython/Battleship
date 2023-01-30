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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("var ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((module) => {

eval("var Ship = function Ship(shipType, length, numOfHits, sunk) {\n  var _this = this;\n  this.shipType = shipType;\n  this.length = length;\n  this.numOfHits = numOfHits;\n  this.sunk = sunk;\n  this.hit = function () {\n    _this.numOfHits++;\n    _this.isSunk();\n  };\n  this.isSunk = function () {\n    if (_this.numOfHits === _this.length) {\n      _this.sunk = true;\n    }\n  };\n};\nmodule.exports = Ship;\n\n/*\n1\tCarrier\t    5\n2\tBattleship\t4\n3\tDestroyer\t3\n4\tSubmarine\t3\n5\tPatrol Boat 2 */\n\n//   const hit = () => {\n//     numOfHits = 0;\n//     numOfHits++;\n//     return numOfHits;\n//   };\n\n//   const isSunk = () => {\n//     if (type === \"Carrier\") {\n//     }\n//   };\n\n//   return {\n//     shipType: shipType,\n//     length: length,\n//     numOfHits: numOfHits,\n//     sunk: sunk,\n//   };\n\n//# sourceURL=webpack://battleship/./src/ship.js?");

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