import { Scene } from "phaser";

export default class PauseMenu extends Scene {
  constructor() {
    super("pause-menu");
  }

  create() {
    this.add
      .text(
        this.sys.canvas.width / 2,
        this.sys.canvas.height / 2,
        "Click to start",
        {
          color: "#bfc500",
          fontFamily: "Montserrat",
          fontSize: "24px",
          fontStyle: "600",
          stroke: "black",
          strokeThickness: 2,
        }
      )
      .setOrigin(0.5, 0.5);

    this.input.on("pointerdown", () => {
      this.scene.resume("fudballs");
      this.scene.stop();
    });
  }
}
