export default class TitleScene extends Phaser.Scene {
  private phaserSprite!: Phaser.GameObjects.Sprite;

  constructor() {
    super({
      key: "TitleScene",
    });
  }

  preload(): void {}

  create(): void {
    this.phaserSprite = this.add.sprite(400, 300, "myImage");
  }
}
