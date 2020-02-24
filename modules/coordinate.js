export default class Coordinate {
  constructor({ x, y }) {
    this.x = x;
    this.y = y;
  }

  /**
   * Checks if given `coordinate` is in the same location as `this`.
   * @param {Coordinate} coordinate
   * @return {boolean} Both coordinates have matching x and y values.
   */
  isSameCoordAs({ x, y }) {
    return this.x === x && this.y === y;
  }
}
