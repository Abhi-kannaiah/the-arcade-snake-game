/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Board.js":
/*!**********************!*\
  !*** ./src/Board.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Board; });\n/* harmony import */ var _Draw__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Draw */ \"./src/Draw.js\");\n/* harmony import */ var _COLLISION__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./COLLISION */ \"./src/COLLISION.js\");\n\n\n\nconst STATES = Object.freeze({\n    GROUND: Symbol('ground'),\n    SNAKE: Symbol('snake'),\n    FOOD: Symbol('food')\n});\n\nclass Board {\n    constructor(width, height) {\n        this.readOnly = Object.freeze({\n            numOfRows: 35,\n            numOfColumns: 35,\n            cellSize: width / 35\n        });\n        this.width = width;\n        this.height = height;\n        this.grid = [];\n        for (let i = 0; i < this.readOnly.numOfRows; i++) {\n            this.grid[i] = [];\n            for (let j = 0; j < this.readOnly.numOfColumns; j++) {\n                this.grid[i][j] = STATES.GROUND;\n            }\n        }\n\n        this.draw = new _Draw__WEBPACK_IMPORTED_MODULE_0__[\"default\"](width, height);\n    }\n\n    updateGrid(snakePositions, foodPosition) {\n        const map = {};\n        for (const i in snakePositions) {\n            const pos = snakePositions[i];\n            const { numOfRows, numOfColumns } = this.readOnly;\n            if (map[pos.coordinates] !== undefined) {\n                // Snake collided with itself, GAME OVER\n                return _COLLISION__WEBPACK_IMPORTED_MODULE_1__[\"default\"].SNAKE;\n            } else if (pos.x < 0 || pos.x >= numOfColumns || pos.y < 0 || pos.y >= numOfRows) {\n                // Snake collided into wall, GAME OVER\n                return _COLLISION__WEBPACK_IMPORTED_MODULE_1__[\"default\"].WALL;\n            }\n            else if (pos.coordinates === foodPosition.coordinates) {\n                // Snake ate food, CONTINUE GAME\n                return _COLLISION__WEBPACK_IMPORTED_MODULE_1__[\"default\"].FOOD;\n            }\n\n            map[pos.coordinates] = true;\n        }\n\n        // Snake didn't make any collision, CONTINUE GAME\n        return _COLLISION__WEBPACK_IMPORTED_MODULE_1__[\"default\"].NONE;\n    }\n\n    updateUI(snakePositions, foodPosition) {\n        // Functions below for drawing on canvas\n        this.clear();\n        this.updateSnake(snakePositions);\n        this.updateFood(foodPosition);\n    }\n\n    clear() {\n        // clear drawing area\n        this.draw.drawSquare('white', 0, 0, this.width, this.height);\n    }\n\n    updateSnake(snakePositions) {\n        const { cellSize } = this.readOnly;\n        snakePositions.forEach(pos => {\n            this.draw.drawSquare('green', pos.x*cellSize, pos.y*cellSize, cellSize, cellSize);\n            this.draw.drawSquareOutline('lightgreen', pos.x*cellSize, pos.y*cellSize, cellSize, cellSize);\n        });\n    }\n\n    updateFood(foodPosition) {\n        const pos = foodPosition;\n        const { cellSize } = this.readOnly;\n        this.draw.drawSquare('red', pos.x*cellSize, pos.y*cellSize, cellSize, cellSize);\n    }\n}\n\n\n//# sourceURL=webpack:///./src/Board.js?");

/***/ }),

/***/ "./src/COLLISION.js":
/*!**************************!*\
  !*** ./src/COLLISION.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\nconst COLLISION = Object.freeze({\n    NONE: Symbol('none'),\n    SNAKE: Symbol('snake'),\n    WALL: Symbol('wall'),\n    FOOD: Symbol('food')\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (COLLISION);\n\n\n//# sourceURL=webpack:///./src/COLLISION.js?");

/***/ }),

/***/ "./src/Draw.js":
/*!*********************!*\
  !*** ./src/Draw.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Draw; });\n\nclass Draw {\n    constructor(width, height) {\n        const canvas = document.createElement('canvas');\n        canvas.width = width;\n        canvas.height = height;\n        canvas.style = 'border:5px solid #000000;';\n        document.body.appendChild(canvas);\n\n        this.canvas = canvas;\n        this.ctx = canvas.getContext('2d');\n    }\n\n    drawSquare(color, x, y, width, height) {\n        const { ctx } = this;\n        ctx.fillStyle = color;\n        ctx.fillRect(x, y, width, height);\n    }\n\n    drawSquareOutline(color, x, y, width, height) {\n        const { ctx } = this;\n        ctx.strokeStyle = color;\n        ctx.strokeRect(x, y, width, height);\n    }\n}\n\n\n//# sourceURL=webpack:///./src/Draw.js?");

/***/ }),

/***/ "./src/Food.js":
/*!*********************!*\
  !*** ./src/Food.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Food; });\n/* harmony import */ var _Position__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Position */ \"./src/Position.js\");\n\n\nclass Food {\n    constructor(x, y) {\n        this.position = new _Position__WEBPACK_IMPORTED_MODULE_0__[\"default\"](x, y);\n    }\n\n    get x() {\n        return this.position.x;\n    }\n\n    set x(x) {\n        this.position.x = x;\n    }\n\n    get y() {\n        return this.position.y;\n    }\n\n    set y(y) {\n        this.position.y = y;\n    }\n\n    update(x, y) {\n        this.position.x = x;\n        this.position.y = y;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/Food.js?");

/***/ }),

/***/ "./src/Game.js":
/*!*********************!*\
  !*** ./src/Game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Game; });\n/* harmony import */ var _Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Board */ \"./src/Board.js\");\n/* harmony import */ var _Snake__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Snake */ \"./src/Snake.js\");\n/* harmony import */ var _Food__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Food */ \"./src/Food.js\");\n/* harmony import */ var _COLLISION__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./COLLISION */ \"./src/COLLISION.js\");\n\n\n\n\n\nclass Game {\n    constructor() {\n        this.board = new _Board__WEBPACK_IMPORTED_MODULE_0__[\"default\"](500, 500);\n        this.snake = new _Snake__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n        this.food = new _Food__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n        this.respawnFood();\n        this.timer = null;\n        this.speed = 125;\n        this.points = 0;\n        window.onkeyup = e => {\n            const key = e.keyCode ? e.keyCode : e.which;\n            if (37 <= key && key <= 40) {\n                // Up, Down, Left, or Right arrow key pressed\n                this.snake.changeDirection(key);\n            }\n        };\n\n        this.update = this.update.bind(this);\n    }\n\n    start() {\n        this.timer = setInterval(this.update, this.speed);\n    }\n\n    stop(message) {\n        clearInterval(this.timer);\n        alert(`${message}\\nScore: ${this.points}`);\n    }\n\n    respawnFood() {\n        let x, y;\n        const UPPER_BOUND = 34;\n        const LOWER_BOUND = 0;\n        let isValidPosition = true;\n\n        do {\n            x = Math.floor((Math.random() * UPPER_BOUND) + LOWER_BOUND);\n            y = Math.floor((Math.random() * UPPER_BOUND) + LOWER_BOUND);\n\n            for (const i in this.snake.bodies) {\n                const snakePosition = this.snake.bodies[i];\n                if (x === snakePosition.x && y === snakePosition.y) {\n                    isValidPosition = false;\n                    break;\n                }\n            }\n        } while(!isValidPosition);\n\n        this.food.update(x, y);\n    }\n\n    update() {\n        this.snake.move();\n\n        // Check for collision with this.board\n        const collision = this.board.updateGrid(this.snake.bodies, this.food.position);\n        const { NONE, SNAKE, WALL, FOOD } = _COLLISION__WEBPACK_IMPORTED_MODULE_3__[\"default\"];\n        switch (collision) {\n        case NONE:\n            // CONTINUE GAME\n            break;\n        case SNAKE:\n            // GAME OVER\n            this.stop('Game Over - collided with snake');\n            break;\n        case WALL:\n            // GAME OVER\n            this.stop('Game Over - collided with wall');\n            break;\n        case FOOD:\n            // EARN POINTS\n            this.points += 10;\n            this.snake.ateFood();\n            this.respawnFood();\n            break;\n        }\n\n        this.board.updateUI(this.snake.bodies, this.food.position);\n    }\n}\n\n\n//# sourceURL=webpack:///./src/Game.js?");

/***/ }),

/***/ "./src/Position.js":
/*!*************************!*\
  !*** ./src/Position.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Position; });\n\nclass Position {\n    constructor(x, y) {\n        this.x = x;\n        this.y = y;\n    }\n\n    get coordinates() {\n        return `${this.x},${this.y}`;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/Position.js?");

/***/ }),

/***/ "./src/Snake.js":
/*!**********************!*\
  !*** ./src/Snake.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Snake; });\n/* harmony import */ var _Position__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Position */ \"./src/Position.js\");\n\n\nconst DIRECTION = Object.freeze({\n    LEFT: Symbol('left'),\n    RIGHT: Symbol('right'),\n    UP: Symbol('up'),\n    DOWN: Symbol('down')\n});\n\nclass Snake {\n    constructor() {\n        this.direction = DIRECTION.RIGHT;\n        this.bodies = [new _Position__WEBPACK_IMPORTED_MODULE_0__[\"default\"](15, 15), new _Position__WEBPACK_IMPORTED_MODULE_0__[\"default\"](14, 15), new _Position__WEBPACK_IMPORTED_MODULE_0__[\"default\"](13, 15)];\n        this.lastTailPos = this.bodies[0];\n    }\n\n    move() {\n        const peek = this.bodies[0];\n        const pos = new _Position__WEBPACK_IMPORTED_MODULE_0__[\"default\"](peek.x, peek.y);\n\n        const { LEFT, RIGHT, UP, DOWN } = DIRECTION;\n        switch (this.direction) {\n        case LEFT:\n            pos.x--;\n            break;\n        case RIGHT:\n            pos.x++;\n            break;\n        case UP:\n            pos.y--;\n            break;\n        case DOWN:\n            pos.y++;\n            break;\n        default:\n            throw Error('Invalid direction');\n        }\n\n        this.bodies.unshift(pos);\n        this.lastTailPos = this.bodies.pop();\n    }\n\n    ateFood() {\n        this.bodies.push(this.lastTailPos);\n    }\n\n    changeDirection(key) {\n        if (key === 38 && this.direction !== DIRECTION.DOWN) {\n            this.direction = DIRECTION.UP;\n        } else if (key === 40 && this.direction !== DIRECTION.UP) {\n            this.direction = DIRECTION.DOWN;\n        } else if (key === 37 && this.direction !== DIRECTION.RIGHT) {\n            this.direction = DIRECTION.LEFT;\n        } else if (key === 39 && this.direction !== DIRECTION.LEFT) {\n            this.direction = DIRECTION.RIGHT;\n        } else {\n            throw Error('Invalid key');\n        }\n    }\n}\n\n\n//# sourceURL=webpack:///./src/Snake.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ \"./src/Game.js\");\n\n\nconst game = new _Game__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\ngame.start();\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });