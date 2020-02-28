import Board from "./modules/board.js";
import BoardRenderer from "./modules/boardRenderer.js";
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  INITIAL_SNAKE_LENGTH
} from "./modules/config.js";
import HighScore from "./modules/highScore.js";
import InputListener from "./modules/inputListener.js";
import ScoreRenderer from "./modules/scoreRenderer.js";
import Snake from "./modules/snake.js";
import Store from "./modules/store.js";
import generateTickFunction from "./modules/tick.js";

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
  const inputLister = new InputListener();

  reset();

  function reset() {
    board.clearBoard();
    const snake = new Snake({ board, initialLength: INITIAL_SNAKE_LENGTH });
    inputLister.subscribe(direction => snake.changeDirection(direction));
    boardRenderer.render();
    scoreRenderer.render(snake.getScore());
    const previousTick = performance.now();
    const tick = generateTickFunction({
      snake,
      boardRenderer,
      scoreRenderer,
      highScore,
      reset,
      previousTick
    });

    window.requestAnimationFrame(tick);
  }
})();
