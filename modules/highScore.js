export default class HighScore {
  constructor({ store }) {
    this.store = store;
    this._highScore = Number.parseInt(this.store.retrieve(), 10);
  }

  /**
   * Gets the current high score.
   * @return {number}
   */
  get() {
    return this._highScore;
  }

  /**
   * Saves `score` to `this.store` if it is higher than the currently saved
   * high score.
   * @param {number} score
   */
  saveIfHigher(score) {
    const scoreInt = Number.parseInt(score, 10);
    if (!scoreInt || scoreInt <= this.get()) return;
    this.store.persist(scoreInt);
    this._highScore = scoreInt;
  }
}
