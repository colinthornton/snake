import Coordinate from "./coordinate.js";

export default class Snake {
  constructor({ initialLength, board }) {
    // prevent snake from being too large for board
    this.initialLength = Math.max(1, Math.min(initialLength, board.height - 1));
    this.board = board;
    this._init();
  }

  /**
   * Calculate next `snakeCoords` and update the board.
   * @return {string} from Status "enum"
   */
  tick() {
    if (this.status === Status.GAME_OVER) return;

    const currentHead = this.snakeCoords[0];
    let { x, y } = currentHead;
    switch (this.nextDirection) {
      case Directions.UP:
        y = currentHead.y - 1;
        if (y < 0) {
          y = this.board.height - 1;
        }
        break;
      case Directions.RIGHT:
        x = currentHead.x + 1;
        if (x > this.board.width - 1) {
          x = 0;
        }
        break;
      case Directions.DOWN:
        y = currentHead.y + 1;
        if (y > this.board.height - 1) {
          y = 0;
        }
        break;
      case Directions.LEFT:
        x = currentHead.x - 1;
        if (x < 0) {
          x = this.board.width - 1;
        }
        break;
    }
    const nextHead = new Coordinate({ x, y });
    this.currentDirection = this.nextDirection;

    if (
      this.snakeCoords.some(snakeCoord => snakeCoord.isSameCoordAs(nextHead))
    ) {
      // Ran into self
      this.status = Status.GAME_OVER;
      return;
    }

    this.snakeCoords.unshift(nextHead);
    if (nextHead.isSameCoordAs(this.appleCoord)) {
      // Ran into apple
      this._spawnApple();
      this.status = Status.GROW;
    } else {
      // Just moving
      const currentTail = this.snakeCoords.pop();
      this.board.togglePixel(currentTail);
      this.board.togglePixel(nextHead);
      this.status = Status.OK;
    }
  }

  /**
   * Set the direction to turn for the next call of `tick()`.
   * @param {string} nextDirection from Directions "enum"
   */
  changeDirection(nextDirection) {
    if (this.status === Status.GAME_OVER) return;

    const currentDirection = this.currentDirection;
    // prevent 180-degree turn
    switch (currentDirection) {
      case Directions.UP:
        if (nextDirection === Directions.DOWN) {
          return;
        }
        break;
      case Directions.RIGHT:
        if (nextDirection === Directions.LEFT) {
          return;
        }
        break;
      case Directions.DOWN:
        if (nextDirection === Directions.UP) {
          return;
        }
        break;
      case Directions.LEFT:
        if (nextDirection === Directions.RIGHT) {
          return;
        }
        break;
      default:
        return;
    }
    this.nextDirection = nextDirection;
  }

  /**
   * Gets the length of the snake.
   * @return {number}
   */
  getLength() {
    return this.snakeCoords.length;
  }

  _init() {
    this._initSnake();
    this._spawnApple();
  }

  _initSnake() {
    this.snakeCoords = [];
    for (let y = this.initialLength - 1; y >= 0; y--) {
      const coord = new Coordinate({ x: 0, y });
      this.snakeCoords.push(coord);
      this.board.togglePixel(coord);
    }
    this.currentDirection = Directions.DOWN;
    this.nextDirection = Directions.DOWN;
  }

  _spawnApple() {
    const appleCoord = this._getRandomCoord();
    if (
      this.snakeCoords.some(snakeCoord => snakeCoord.isSameCoordAs(appleCoord))
    ) {
      // spawned inside of the snake, retry...
      return this._spawnApple();
    }
    this.appleCoord = appleCoord;
    this.board.togglePixel(this.appleCoord);
  }

  _getRandomCoord() {
    const x = Math.floor(Math.random() * this.board.width);
    const y = Math.floor(Math.random() * this.board.height);
    return new Coordinate({ x, y });
  }
}

/**
 * "Enum" for possible snake directions
 */
export const Directions = {
  UP: "UP",
  RIGHT: "RIGHT",
  DOWN: "DOWN",
  LEFT: "LEFT"
};

/**
 * "Enum" for tick results
 */
export const Status = {
  OK: "OK", // Just moving
  GROW: "GROW", // Moved over apple and grew in length
  GAME_OVER: "GAME_OVER" // Ran into self
};
