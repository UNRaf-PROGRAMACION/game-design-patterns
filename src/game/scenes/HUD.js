import { Scene } from "phaser";
import GameManager from "../GameManager.js";

export class HUD extends Scene {
  constructor() {
    super("HUD");
  }

  init() {}

  preload() {}

  create() {
    // Create HUD: life
    this.gameManager = GameManager.getInstance();
    this.livesText = this.add.text(
      16,
      16,
      "Lives: " + this.gameManager.getPlayerLives(),
      { fontSize: "32px", fill: "#FFF" }
    );

    // escuchar evento de GAME
    this.scene.get("Game").events.on("livesChanged", (data) => {
      this.livesText.setText("Lives: " + data.lives);
    });
  }

  update(t, dt) {
    if (this.player) this.player.update(dt / 1000);
  }
}
