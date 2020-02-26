/**
 * Wrapper for storing a single key:value pair in localStorage.
 */
export default class Store {
  constructor({ key, initialValue }) {
    this.key = key;
    if (this.retrieve() === null) {
      this.persist(initialValue);
    }
  }

  retrieve() {
    return localStorage.getItem(this.key);
  }

  persist(value) {
    localStorage.setItem(this.key, value);
  }
}
