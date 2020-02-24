import Pixel from "./pixel.js";

export default class Board {
  constructor({ height, width }) {
    this.height = height;
    this.width = width;
    this._generateBoard();
  }

  /**
   * Toggle the pixel at the given `coordinate`.
   * @param {Object} coordinate
   * @param {number} coordinate.x
   * @param {number} coordinate.y
   */
  togglePixel({ x, y }) {
    this.pixels[y][x].toggle();
  }

  /**
   * Turn all pixels on the board off.
   */
  clearBoard() {
    for (let row of this.pixels) {
      for (let pixel of row) {
        pixel.unset();
      }
    }
  }

  _generateBoard() {
    this.pixels = [];
    for (let y = 0; y < this.height; y++) {
      this.pixels.push([]);
      for (let x = 0; x < this.width; x++) {
        this.pixels[y].push(new Pixel({ x, y }));
      }
    }
  }
}
