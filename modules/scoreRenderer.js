export default class ScoreRenderer {
  constructor({ scoreElement, highScoreElement, highScore }) {
    this.scoreElement = scoreElement;
    this.highScoreElement = highScoreElement;
    this.highScore = highScore;
  }

  render(score) {
    this.scoreElement.textContent = score;
    const highScore = this.highScore.get();
    this.highScoreElement.textContent = highScore > score ? highScore : score;
  }
}
