import TitleScene from "../scenes/TitleScene";

export default class Beam extends Phaser.GameObjects.Sprite {
  constructor(scene: TitleScene) {
    const x = scene.player.x;
    const y = scene.player.y;

    super(scene, x, y, "beam");

    scene.add.existing(this);

    this.play("beam_anim");
    scene.physics.world.enableBody(this);
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.velocity.y = -250;

    scene.projectiles.add(this);
  }

  update() {
    if (this.y < 0) {
      this.destroy();
    }
  }
}
