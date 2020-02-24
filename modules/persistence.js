export function getHighScore() {
  return get("snake_high_score");
}

export function saveHighScore(score) {
  set({ snake_high_score: score });
}

function set(map) {
  for (const [key, value] of Object.entries(map)) {
    localStorage.setItem(key, value);
  }
}

function get(key) {
  return localStorage.getItem(key);
}
