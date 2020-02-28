export default class Subject {
  constructor() {
    this._notify = () => {};
  }

  subscribe(notifyFunc) {
    this._notify = notifyFunc;
  }
}
