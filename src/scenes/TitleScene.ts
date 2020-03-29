export default class TitleScene extends Phaser.Scene {
  private background!: Phaser.GameObjects.TileSprite;
  private ship!: Phaser.GameObjects.Image;
  private ship2!: Phaser.GameObjects.Image;
  private ship3!: Phaser.GameObjects.Image;

  constructor() {
    super({
      key: "TitleScene",
    });
  }

  init(): void {}

  preload(): void {}

  create(): void {
    this.background = this.add.tileSprite(
      0,
      0,
      this.sys.canvas.width,
      this.sys.canvas.height,
      "background"
    );
    this.background.setOrigin(0, 0);

    this.ship = this.add.image(
      this.sys.canvas.width / 2 - 50,
      this.sys.canvas.height / 2,
      "ship"
    );
    this.ship2 = this.add.image(
      this.sys.canvas.width / 2,
      this.sys.canvas.height / 2,
      "ship2"
    );
    this.ship3 = this.add.image(
      this.sys.canvas.width / 2 + 50,
      this.sys.canvas.height / 2,
      "ship3"
    );

    this.add.text(20, 20, "Playing game", {
      font: "25px Arial",
      fill: "yellow",
    });
  }

  update(): void {
    this.moveShip(this.ship, 1);
    this.moveShip(this.ship2, 2);
    this.moveShip(this.ship3, 5);

    this.background.tilePositionY -= 0.5;
  }

  private moveShip(ship: Phaser.GameObjects.Image, speed: number) {
    ship.y += speed;
    if (ship.y > this.sys.canvas.height) {
      this.resetShipPos(ship);
    }
  }

  private resetShipPos(ship: Phaser.GameObjects.Image) {
    ship.y = 0;
    const randomX = Phaser.Math.Between(0, this.sys.canvas.width);
    ship.x = randomX;
  }
}
