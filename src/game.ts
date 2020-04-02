import "phaser";
import BootScene from "scenes/BootScene";
import TitleScene from "scenes/TitleScene";

export interface GameSetting {
  playerSpeed: number;
}
export const gameSettings = {
  playerSpeed: 200,
};

// main game configuration
const config: Phaser.Types.Core.GameConfig = {
  title: "Tower Battle",
  version: "1.0",
  width: 256,
  height: 272,
  type: Phaser.AUTO,
  parent: "game",
  scene: [BootScene, TitleScene],
  backgroundColor: "#222222",
  render: { pixelArt: false, antialias: true },

  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
};

class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

// when the page is loaded, create our game instance
window.onload = () => {
  const game = new Game(config);
};
