import { Directions } from "./snake.js";
import Subject from "./subject.js";

export default class InputListener extends Subject {
  constructor() {
    super();
    this._setKeydownListener();
    this._setTouchListener();
  }

  _setKeydownListener() {
    document.addEventListener("keydown", ({ code }) => {
      switch (code) {
        case "KeyW":
        case "ArrowUp":
          return this._notify(Directions.UP);
        case "KeyD":
        case "ArrowRight":
          return this._notify(Directions.RIGHT);
        case "KeyS":
        case "ArrowDown":
          return this._notify(Directions.DOWN);
        case "KeyA":
        case "ArrowLeft":
          return this._notify(Directions.LEFT);
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
          return this._notify(Directions.UP);
        } else {
          return this._notify(Directions.DOWN);
        }
      } else {
        if (deltaX < 0) {
          return this._notify(Directions.LEFT);
        } else {
          return this._notify(Directions.RIGHT);
        }
      }
    });
  }
}
