import { Scene } from "phaser";
import { Player } from "../Player.js";
import GameManager from "../GameManager.js";

export class Game extends Scene {
  constructor() {
    super("Game");
    this.cycleText = null;
    this.currentCycle = "init";
    this.player = null;
  }

  init() {
    this.currentCycle = "init";
  }

  preload() {
    this.currentCycle = "preload";
    this.load.setPath("assets");
    this.load.image("background", "bg.png");
    this.load.image("logo", "logo.png");
  }

  create() {
    this.currentCycle = "create";
    this.add.image(512, 384, "background");
    this.player = new Player(this, 512, 350, "logo");

    this.gameManager = GameManager.getInstance();
    console.log("Player Lives:", this.gameManager.getPlayerLives());
    this.gameManager.setPlayerLives(5);
    console.log(
      "Player Lives After Setting:",
      this.gameManager.getPlayerLives()
    );
  }

  update(t, dt) {
    this.currentCycle = "update";
    if (this.player) this.player.update(dt / 1000);
  }
}
