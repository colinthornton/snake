export default class HighScore {
  constructor({ store }) {
    this.store = store;
  }

  get() {
    if (!this._highScore) {
      this._highScore = Number.parseInt(this.store.retrieve(), 10);
    }
    return this._highScore;
  }

  saveIfHigher(score) {
    const scoreInt = Number.parseInt(score, 10);
    if (!scoreInt || scoreInt <= this.get()) return;
    this.store.persist(scoreInt);
    this._highScore = scoreInt;
  }
}
