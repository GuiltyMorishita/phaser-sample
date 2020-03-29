export default class BootScene extends Phaser.Scene {
  private phaserSprite!: Phaser.GameObjects.Sprite;

  constructor() {
    super({
      key: "BootScene",
    });
  }

  preload(): void {
    this.load.image("myImage", "assets/phaser.png");
  }

  create(): void {
    this.scene.start("TitleScene");
  }
}
