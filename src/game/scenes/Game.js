import { Scene } from "phaser";

export class Game extends Scene {
  constructor() {
    super("Game");
    this.cycleText = null;
    this.currentCycle = "init";
  }

  init() {
    this.currentCycle = "init";
    this.showConsole();
  }

  preload() {
    this.currentCycle = "preload";
    this.load.setPath("assets");
    this.load.image("background", "bg.png");
    this.load.image("logo", "logo.png");
    this.showConsole();
  }

  create() {
    this.currentCycle = "create";
    this.add.image(512, 384, "background");
    this.add.image(512, 350, "logo").setDepth(100);

    this.cycleText = this.add
      .text(512, 490, "Ciclo actual: " + this.currentCycle, {
        fontFamily: "Arial Black",
        fontSize: 38,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5)
      .setDepth(100);

    this.showConsole();
  }

  // El método update recibe dos parámetros:
  // t: tiempo total transcurrido en milisegundos desde el inicio de la escena.
  // dt: tiempo (delta) en milisegundos desde el último frame.
  // Útil para animaciones y lógica dependiente del tiempo, por ejemplo:
  // - Mover un objeto a velocidad constante: posición += velocidad * (dt/1000)
  // - Temporizadores y cooldowns: tiempoRestante -= dt
  // - Interpolaciones y transiciones suaves entre estados
  update(t, dt) {
    this.currentCycle = "update";
    if (this.cycleText) {
      this.cycleText.setText("Ciclo actual: " + this.currentCycle);
    }
    this.showConsole(t, dt);
  }

  showConsole(t, dt) {
    if (typeof t !== "undefined" && typeof dt !== "undefined") {
      console.log(
        "Ciclo actual: " + this.currentCycle + " | t: " + t + " | dt: " + dt
      );
    } else {
      console.log("Ciclo actual: " + this.currentCycle);
    }
  }
}
