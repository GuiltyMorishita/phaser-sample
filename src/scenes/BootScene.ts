export default class BootScene extends Phaser.Scene {
  private phaserSprite!: Phaser.GameObjects.Sprite;

  constructor() {
    super({
      key: "BootScene",
    });
  }

  init(): void {}

  preload(): void {
    this.load.image("background", "assets/images/background.png");
    this.load.image("ship", "assets/images/ship.png");
    this.load.image("ship2", "assets/images/ship2.png");
    this.load.image("ship3", "assets/images/ship3.png");
  }

  create(): void {
    this.add.text(20, 20, "Loading game ...");
    this.scene.start("TitleScene");
  }

  update(): void {}
}
