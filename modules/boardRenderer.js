export default class BoardRenderer {
  constructor({ boardElement, board }) {
    this.boardElement = boardElement;
    this.board = board;
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
      this.boardElement.appendChild(rowElement);
      for (const pixel of row) {
        const pixelElement = document.createElement("div");
        pixelElement.className = "pixel";
        pixelElement.id = `x${pixel.x}y${pixel.y}`;
        rowElement.appendChild(pixelElement);
      }
    }
  }
}
