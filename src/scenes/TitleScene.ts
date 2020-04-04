import { gameSettings } from "../game";
import Beam from "../sprites/Beam";

export default class TitleScene extends Phaser.Scene {
  private background!: Phaser.GameObjects.TileSprite;
  private ship1!: Phaser.GameObjects.Sprite;
  private ship2!: Phaser.GameObjects.Sprite;
  private ship3!: Phaser.GameObjects.Sprite;
  private enemiges!: Phaser.Physics.Arcade.Group;
  private powerUps!: Phaser.Physics.Arcade.Group;
  private cursorKeys!: Phaser.Types.Input.Keyboard.CursorKeys;
  private spacebar!: Phaser.Input.Keyboard.Key;

  public player!: Phaser.Physics.Arcade.Sprite;
  public projectiles!: Phaser.GameObjects.Group;

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

    this.ship1 = this.add.sprite(
      this.sys.canvas.width / 2 - 50,
      this.sys.canvas.height / 2,
      "ship1"
    );
    this.ship2 = this.add.sprite(
      this.sys.canvas.width / 2,
      this.sys.canvas.height / 2,
      "ship2"
    );
    this.ship3 = this.add.sprite(
      this.sys.canvas.width / 2 + 50,
      this.sys.canvas.height / 2,
      "ship3"
    );

    this.enemiges = this.physics.add.group();
    this.enemiges.add(this.ship1);
    this.enemiges.add(this.ship2);
    this.enemiges.add(this.ship3);

    this.ship1.play("ship1_anim");
    this.ship2.play("ship2_anim");
    this.ship3.play("ship3_anim");

    this.ship1.setInteractive();
    this.ship2.setInteractive();
    this.ship3.setInteractive();

    this.powerUps = this.physics.add.group();

    const maxObjects = 4;
    for (let i = 0; i <= maxObjects; i++) {
      const powerUp = this.physics.add.sprite(16, 16, "power-up");
      this.powerUps.add(powerUp);
      powerUp.setRandomPosition(
        0,
        0,
        this.game.config.width as number,
        this.game.config.height as number
      );

      if (Math.random() > 0.5) {
        powerUp.play("red");
      } else {
        powerUp.play("gray");
      }

      powerUp.setVelocity(100, 100);
      powerUp.setCollideWorldBounds(true);
      powerUp.setBounce(1);
    }

    this.input.on("gameobjectdown", this.destroyShip, this);

    this.add.text(20, 20, "Playing game", {
      font: "25px Arial",
      fill: "yellow",
    });

    this.player = this.physics.add.sprite(
      (this.game.config.width as number) / 2 - 8,
      (this.game.config.width as number) - 64,
      "player"
    );
    this.player.play("thrust");
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);

    this.spacebar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    this.projectiles = this.add.group();

    this.physics.add.collider(
      this.projectiles,
      this.powerUps,
      (projectiles) => {
        projectiles.destroy();
      }
    );

    this.physics.add.overlap(
      this.player,
      this.powerUps,
      this.pickPowerUp,
      undefined,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.enemiges,
      this.hurtPlayer,
      undefined,
      this
    );

    this.physics.add.overlap(
      this.projectiles,
      this.enemiges,
      this.hitEnemy,
      undefined,
      this
    );
  }

  private pickPowerUp(
    _player: Phaser.GameObjects.GameObject,
    powerUp: Phaser.GameObjects.GameObject
  ) {
    (powerUp as Phaser.Physics.Arcade.Sprite).disableBody(true, true);
  }

  private hurtPlayer(
    player: Phaser.GameObjects.GameObject,
    enemy: Phaser.GameObjects.GameObject
  ) {
    this.resetShipPos(enemy as Phaser.GameObjects.Sprite);

    const p = player as Phaser.GameObjects.Sprite;
    p.x = (this.game.config.width as number) / 2 - 8;
    p.y = (this.game.config.height as number) - 64;
  }

  private hitEnemy(
    projectile: Phaser.GameObjects.GameObject,
    enemy: Phaser.GameObjects.GameObject
  ) {
    projectile.destroy();
    this.resetShipPos(enemy as Phaser.GameObjects.Sprite);
  }

  update(): void {
    this.moveShip(this.ship1, 1);
    this.moveShip(this.ship2, 2);
    this.moveShip(this.ship3, 3);

    this.background.tilePositionY -= 0.5;

    this.movePlayerManager();

    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      this.shootBeam();
    }
  }

  private movePlayerManager() {
    if (this.cursorKeys.left!.isDown) {
      this.player.setVelocityX(-gameSettings.playerSpeed);
    } else if (this.cursorKeys.right!.isDown) {
      this.player.setVelocityX(gameSettings.playerSpeed);
    } else {
      this.player.setVelocityX(0);
    }

    if (this.cursorKeys.up!.isDown) {
      this.player.setVelocityY(-gameSettings.playerSpeed);
    } else if (this.cursorKeys.down!.isDown) {
      this.player.setVelocityY(gameSettings.playerSpeed);
    } else {
      this.player.setVelocityY(0);
    }
  }

  private shootBeam() {
    const beam = new Beam(this);
  }

  private moveShip(ship: Phaser.GameObjects.Sprite, speed: number) {
    ship.y += speed;
    if (ship.y > this.sys.canvas.height) {
      this.resetShipPos(ship);
    }
  }

  private resetShipPos(ship: Phaser.GameObjects.Sprite) {
    ship.y = 0;
    const randomX = Phaser.Math.Between(0, this.sys.canvas.width);
    ship.x = randomX;
  }

  private destroyShip(
    _pointer: Phaser.GameObjects.Sprite,
    gameObject: Phaser.GameObjects.Sprite
  ) {
    gameObject.setTexture("explosion");
    gameObject.play("explode");
  }
}
