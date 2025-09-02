import Phaser from "phaser";

let bulletCounter = 0;

class Bullet extends Phaser.GameObjects.Ellipse {
  constructor(scene, x, y, color = 0xffffff, radius = 6) {
    super(scene, x, y, radius * 2, radius * 2, color);
    this.radius = radius;
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setAllowGravity(false);
    this.setActive(false);
    this.setVisible(false);

    this._bulletId = ++bulletCounter;
    console.log(`%cBullet created [id=${this._bulletId}]`, "color: green");
  }

  fire(x, y, velocityX = 0, velocityY = 0) {
    if (x && y) {
      this.setPosition(x, y);
    }

    if (velocityX) {
      this.body.setVelocityX(velocityX);
    }

    if (velocityY) {
      this.body.setVelocityY(velocityY);
    }

    console.log(
      `%cBullet fired [id=${this._bulletId}] v=(${velocityX},${velocityY})`,
      "color: blue"
    );
  }

  activate() {
    this.setActive(true);
    this.setVisible(true);
    this.body.enable = true;
    console.log(`%cBullet activated [id=${this._bulletId}]`, "color: green");
  }

  deactivate() {
    this.setActive(false);
    this.setVisible(false);
    this.body.enable = false;
    this.body.setVelocity(0, 0);
  }

  playExplosionAndDeactivated(key = "anim-explosion-1") {
    const boom = this.scene.add.sprite(this.x, this.y, "fx");
    boom.play(key);
    boom.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      boom.destroy();
    });
  }

  update() {
    if (
      this.y < -this.height ||
      this.y > this.scene.scale.height + this.height
    ) {
      this.deactivate();
      console.log(
        `%cBullet deactivated [id=${this._bulletId}]`,
        "color: orange"
      );
    }
  }
}
export default Bullet;
