class GameManager {
  static instance;

  constructor() {
    if (GameManager.instance) {
      return GameManager.instance;
    }
    this.playerLives = 3;
    this.isInnmune = false;
    GameManager.instance = this;
  }

  static getInstance() {
    if (!GameManager.instance) {
      GameManager.instance = new GameManager();
    }
    return GameManager.instance;
  }

  setPlayerLives(lives) {
    this.playerLives = lives;
  }

  getPlayerLives() {
    return this.playerLives;
  }

  losePlayerLife() {
    if (this.isInnmune) return;
    this.playerLives = Math.max(0, this.playerLives - 1);
  }

  resetPlayerLives() {
    this.playerLives = 3;
  }
}

export default GameManager;
