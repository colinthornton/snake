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
        const { x, y, lit } = pixel;
        if (lit) {
          this._pixelElements[y][x].classList.add("lit");
        } else {
          this._pixelElements[y][x].classList.remove("lit");
        }
      }
    }
  }

  _init() {
    this._createPixelElements();
    this._appendElementsToDOM();
  }

  _createPixelElements() {
    this._pixelElements = this.board.pixels.map(row =>
      row.map(pixel => {
        const pixelElement = document.createElement("div");
        pixelElement.className = "pixel";
        return pixelElement;
      })
    );
  }

  _appendElementsToDOM() {
    for (const row of this._pixelElements) {
      const rowElement = document.createElement("div");
      rowElement.className = "row";
      this.boardElement.appendChild(rowElement);
      for (const pixelElement of row) {
        rowElement.appendChild(pixelElement);
      }
    }
  }
}
