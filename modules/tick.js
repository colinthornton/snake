import { TICK_MS } from "./config.js";
import { Status } from "./snake.js";

/**
 * Generates a "tick" function that incrementally updates the game state based
 * on time between calls.
 * @param {Object} config
 * @param {Snake} config.snake
 * @param {BoardRenderer} config.boardRenderer
 * @param {ScoreRenderer} config.scoreRenderer
 * @param {HighScore} config.highScore
 * @param {function} config.reset
 * @param {number} config.reset
 * @return {function} Tick function to be called by `window.requestAnimationFrame`.
 */
export default function generateTickFunction({
  snake,
  boardRenderer,
  scoreRenderer,
  highScore,
  reset,
  previousTick
}) {
  return function tick(timestamp) {
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
  };
}
