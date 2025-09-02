import Phaser from "phaser";
import Bullet from "./Bullet";

class Enemy {
  constructor(scene) {
    this.scene = scene;

    this.bullets = scene.physics.add.group({
      classType: Bullet,
      runChildUpdate: true,
      maxSize: 20,
    });
    this.bulletSpeed = 200;
  }

  // Dispara desde una posición y dirección específica
  shootFrom(x, y, velocityX, velocityY, color = 0xff0000, radius = 4) {
    const bullet = this.bullets.get(x, y, color, radius);
    if (bullet) {
      bullet.activate();
      bullet.fire(x, y, velocityX, velocityY);
      console.log("Bullet shot from band", bullet);
    }
  }
}

export default Enemy;
