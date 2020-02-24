import Board from "./modules/board.js";
import BoardRenderer from "./modules/boardRenderer.js";
import Snake, { Directions, Status } from "./modules/snake.js";
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  TICK_MS,
  INITIAL_SNAKE_LENGTH
} from "./modules/config.js";

(function main() {
  const scoreElement = document.getElementById("score");
  const boardElement = document.getElementById("board");
  const board = new Board({ height: BOARD_HEIGHT, width: BOARD_WIDTH });
  const boardRenderer = new BoardRenderer({ board, boardElement });
  let snake = new Snake({ board, initialLength: INITIAL_SNAKE_LENGTH });
  let interval;

  setKeydownListener();
  reset();

  function reset() {
    board.clearBoard();
    snake = new Snake({ board, initialLength: INITIAL_SNAKE_LENGTH });
    boardRenderer.render();
    updateScore();
    interval = setGameTick();
  }

  function setGameTick() {
    return setInterval(() => {
      const status = snake.tick();
      boardRenderer.render();
      if (status === Status.GAME_OVER) {
        clearInterval(interval);
        setTimeout(reset, 3000);
      }
      if (status === Status.GROW) {
        updateScore();
      }
    }, TICK_MS);
  }

  function updateScore() {
    const score = snake.getLength();
    scoreElement.textContent = score;
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
})();
