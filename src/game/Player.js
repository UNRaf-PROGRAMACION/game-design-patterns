import { StateMachine } from "./state/StateMachine.js";
import { State } from "./state/State.js";

// Extiende de sprite y usa el asset "logo"
export class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    this.scene = scene;

    this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.stateMachine = new StateMachine("idle");
    this.stateMachine.addState("idle", new IdleState());
    this.stateMachine.addState("moving", new MovingState());
    this.stateMachine.addState("running", new RunningState());
    this.stateMachine.changeState("idle", { player: this });

    this.scene.add.existing(this); // Agrega el sprite a la escena
  }

  update(dt) {
    this.stateMachine.update(dt);
  }
}

class IdleState extends State {
  init(params) {
    this.player = params.player;
    // FX: Tint azul al entrar en idle
    this.player.setTint(0x3399ff);
    console.log("Entering Idle State");
  }
  update(dt) {
    // Si se presiona alguna tecla de movimiento, cambia a moving
    const cursors = this.player.cursors;
    if (
      cursors.left.isDown ||
      cursors.right.isDown ||
      cursors.up.isDown ||
      cursors.down.isDown
    ) {
      this.player.stateMachine.changeState("moving", { player: this.player });
    }

    if (cursors.shift.isDown) {
      this.player.stateMachine.changeState("running", { player: this.player });
    }
  }
  finish() {
    // FX: Quita tint al salir de idle
    this.player.clearTint();
    console.log("Exiting Idle State");
  }
}

class MovingState extends State {
  init(params) {
    this.player = params.player;
    // FX: Tint verde al entrar en moving
    this.player.setTint(0x33ff66);
    console.log("Entering Moving State");
  }
  update(dt) {
    this.handleInput(dt);
    // Si no se presiona ninguna tecla, vuelve a idle
    const cursors = this.player.cursors;
    if (
      !cursors.left.isDown &&
      !cursors.right.isDown &&
      !cursors.up.isDown &&
      !cursors.down.isDown
    ) {
      this.player.stateMachine.changeState("idle", { player: this.player });
    }
  }
  handleInput(dt) {
    const cursors = this.player.cursors;
    const speed = 200 * dt;
    if (cursors.left.isDown) {
      this.player.x -= speed;
    }
    if (cursors.right.isDown) {
      this.player.x += speed;
    }
    if (cursors.up.isDown) {
      this.player.y -= speed;
    }
    if (cursors.down.isDown) {
      this.player.y += speed;
    }
  }
  finish() {
    // FX: Quita tint al salir de moving
    this.player.clearTint();
    console.log("Exiting Moving State");
  }
}

class RunningState extends State {
  init(params) {
    this.player = params.player;
    // FX: Tint rojo al entrar en running
    this.player.setTint(0xff3333);
    console.log("Entering Running State");
  }
  update(dt) {
    this.handleInput(dt);
    // Si no se presiona ninguna tecla, vuelve a idle
    const cursors = this.player.cursors;
    if (
      !cursors.left.isDown &&
      !cursors.right.isDown &&
      !cursors.up.isDown &&
      !cursors.down.isDown
    ) {
      this.player.stateMachine.changeState("idle", { player: this.player });
    }
  }
  handleInput(dt) {
    const cursors = this.player.cursors;
    const speed = 400 * dt;
    if (cursors.left.isDown) {
      this.player.x -= speed;
    }
    if (cursors.right.isDown) {
      this.player.x += speed;
    }
    if (cursors.up.isDown) {
      this.player.y -= speed;
    }
    if (cursors.down.isDown) {
      this.player.y += speed;
    }
  }
  finish() {
    // FX: Quita tint al salir de running
    this.player.clearTint();
    console.log("Exiting Running State");
  }
}
