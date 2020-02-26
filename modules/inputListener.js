import Snake, { Directions } from "./snake.js";

export default class InputListener {
  constructor() {
    this.snake;
    this._setKeydownListener();
    this._setTouchListener();
  }

  /**
   * Sets the snake to control with user inputs.
   * @param {Snake} snake
   */
  setSnake(snake) {
    this.snake = snake;
  }

  _update(direction) {
    if (this.snake instanceof Snake) {
      this.snake.changeDirection(direction);
    }
  }

  _setKeydownListener() {
    document.addEventListener("keydown", ({ code }) => {
      switch (code) {
        case "KeyW":
        case "ArrowUp":
          return this._update(Directions.UP);
        case "KeyD":
        case "ArrowRight":
          return this._update(Directions.RIGHT);
        case "KeyS":
        case "ArrowDown":
          return this._update(Directions.DOWN);
        case "KeyA":
        case "ArrowLeft":
          return this._update(Directions.LEFT);
      }
    });
  }

  _setTouchListener() {
    let touchstartX;
    let touchstartY;
    document.addEventListener("touchstart", e => {
      e.preventDefault();
      touchstartX = e.changedTouches[0].clientX;
      touchstartY = e.changedTouches[0].clientY;
    });

    document.addEventListener("touchend", e => {
      e.preventDefault();
      const touchendX = e.changedTouches[0].clientX;
      const touchendY = e.changedTouches[0].clientY;
      const deltaX = touchendX - touchstartX;
      const deltaY = touchendY - touchstartY;
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        if (deltaY < 0) {
          return this._update(Directions.UP);
        } else {
          return this._update(Directions.DOWN);
        }
      } else {
        if (deltaX < 0) {
          return this._update(Directions.LEFT);
        } else {
          return this._update(Directions.RIGHT);
        }
      }
    });
  }
}
