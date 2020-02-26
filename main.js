import Board from "./modules/board.js";
import BoardRenderer from "./modules/boardRenderer.js";
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  TICK_MS,
  INITIAL_SNAKE_LENGTH
} from "./modules/config.js";
import HighScore from "./modules/highScore.js";
import ScoreRenderer from "./modules/scoreRenderer.js";
import Snake, { Directions, Status } from "./modules/snake.js";
import Store from "./modules/store.js";

(function main() {
  const store = new Store({ key: "snake_high_score", initialValue: 0 });
  const highScore = new HighScore({ store });
  const scoreRenderer = new ScoreRenderer({
    scoreElement: document.getElementById("score"),
    highScoreElement: document.getElementById("highScore"),
    highScore
  });
  const board = new Board({ height: BOARD_HEIGHT, width: BOARD_WIDTH });
  const boardRenderer = new BoardRenderer({
    boardElement: document.getElementById("board"),
    board
  });
  let snake;
  let previousTick;
  setEventListeners();

  reset();

  function reset() {
    board.clearBoard();
    snake = new Snake({ board, initialLength: INITIAL_SNAKE_LENGTH });
    boardRenderer.render();
    scoreRenderer.render(snake.getScore());
    previousTick = performance.now();
    window.requestAnimationFrame(tick);
  }

  function tick(timestamp) {
    const nextTick = previousTick + TICK_MS;
    if (timestamp > nextTick) {
      const timeSincePreviousTick = timestamp - previousTick;
      const tickCount = Math.floor(timeSincePreviousTick / TICK_MS);
      for (let i = 0; i < tickCount; i++) {
        snake.tick();
        previousTick = previousTick + TICK_MS;
      }
      boardRenderer.render();
      if (snake.status === Status.GAME_OVER) {
        highScore.saveIfHigher(snake.getScore());
        setTimeout(reset, 3000);
        return;
      }
      if (snake.status === Status.GROW) {
        scoreRenderer.render(snake.getScore());
      }
    }
    window.requestAnimationFrame(tick);
  }

  function setEventListeners() {
    setKeydownListener();
    setTouchListener();
  }

  function setKeydownListener() {
    document.addEventListener("keydown", ({ code }) => {
      switch (code) {
        case "KeyW":
        case "ArrowUp":
          snake.changeDirection(Directions.UP);
          break;
        case "KeyD":
        case "ArrowRight":
          snake.changeDirection(Directions.RIGHT);
          break;
        case "KeyS":
        case "ArrowDown":
          snake.changeDirection(Directions.DOWN);
          break;
        case "KeyA":
        case "ArrowLeft":
          snake.changeDirection(Directions.LEFT);
          break;
      }
    });
  }

  function setTouchListener() {
    let touchstartX;
    let touchstartY;
    document.addEventListener("touchstart", ({ changedTouches }) => {
      touchstartX = changedTouches[0].clientX;
      touchstartY = changedTouches[0].clientY;
    });

    document.addEventListener("touchend", ({ changedTouches }) => {
      const touchendX = changedTouches[0].clientX;
      const touchendY = changedTouches[0].clientY;
      const deltaX = touchendX - touchstartX;
      const deltaY = touchendY - touchstartY;
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        if (deltaY < 0) {
          snake.changeDirection(Directions.UP);
        } else {
          snake.changeDirection(Directions.DOWN);
        }
      } else {
        if (deltaX < 0) {
          snake.changeDirection(Directions.LEFT);
        } else {
          snake.changeDirection(Directions.RIGHT);
        }
      }
    });
  }
})();
