export default class Coordinate {
  constructor({ x, y }) {
    this.x = x;
    this.y = y;
  }

  /**
   * Checks if given `coordinate` is in the same location as `this`.
   * @param {Object} coordinate
   * @param {number} coordinate.x
   * @param {number} coordinate.y
   * @return {boolean} Both coordinates have matching x and y values.
   */
  isSameCoordAs({ x, y }) {
    return this.x === x && this.y === y;
  }
}
