import { BOARD_HEIGHT, BOARD_WIDTH } from "./config.js";

export default class BoardRenderer {
  constructor({ board, boardElement }) {
    this.board = board;
    this.boardElement = boardElement;
    this._init();
  }

  /**
   * Update element classes to turn pixels on or off based on the state of
   * `this.board`.
   */
  render() {
    for (const row of this.board.pixels) {
      for (const pixel of row) {
        const pixelElement = document.getElementById(`x${pixel.x}y${pixel.y}`);
        if (pixel.lit) {
          pixelElement.classList.add("lit");
        } else {
          pixelElement.classList.remove("lit");
        }
      }
    }
  }

  _init() {
    for (const row of this.board.pixels) {
      const rowElement = document.createElement("div");
      rowElement.className = "row";
      rowElement.style.height = `${100 / BOARD_HEIGHT}%`;
      rowElement.style.width = `100%`;
      this.boardElement.appendChild(rowElement);
      for (const pixel of row) {
        const pixelElement = document.createElement("div");
        pixelElement.className = "pixel";
        pixelElement.id = `x${pixel.x}y${pixel.y}`;
        pixelElement.style.height = "100%";
        pixelElement.style.width = `${100 / BOARD_WIDTH}%`;
        rowElement.appendChild(pixelElement);
      }
    }
  }
}
