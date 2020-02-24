import Coordinate from "./coordinate.js";

export default class Pixel extends Coordinate {
  constructor({ x, y }) {
    super({ x, y });
    this.lit = false;
  }

  set() {
    this.lit = true;
  }

  unset() {
    this.lit = false;
  }

  toggle() {
    this.lit = !this.lit;
  }
}
