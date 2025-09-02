import { Scene } from "phaser";
import { Player } from "../Player.js";
import GameManager from "../GameManager.js";
import Enemy from "../Enemy.js";

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
    this.enemy = new Enemy(this);

    // Disparar varias balas desde posiciones válidas cada 1500 ms
    this.time.addEvent({
      delay: 1500,
      callback: () => {
        if (this.enemy) {
          const randomSpeedX = Phaser.Math.Between(0, this.enemy.bulletSpeed);
          const randomSpeedY = this.enemy.bulletSpeed;
          this.enemy.shootFrom(0, 0, randomSpeedX, randomSpeedY);
        }
      },
      loop: true,
    });

    this.physics.add.collider(
      this.player,
      this.enemy.bullets,
      (player, bullet) => {
        bullet.deactivate();
        this.player.body.setVelocity(0);

        this.gameManager.losePlayerLife();
        console.log(
          "Player Lives After Hit:",
          this.gameManager.getPlayerLives()
        );

        this.events.emit("livesChanged", {
          lives: this.gameManager.getPlayerLives(),
        });
      }
    );

    // Lanzar HUD
    this.scene.launch("HUD");
  }

  update(t, dt) {
    this.currentCycle = "update";
    if (this.player) this.player.update(dt / 1000);
  }
}
