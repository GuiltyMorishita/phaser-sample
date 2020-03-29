const path = require("path");
const pathToPhaser = path.join(__dirname, "/node_modules/phaser/");
const phaser = path.join(pathToPhaser, "dist/phaser.js");

module.exports = {
  entry: {
    index: path.join(__dirname, "src", "game.ts"),
  },
  output: {
    path: path.resolve(__dirname, "www"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: "ts-loader", exclude: "/node_modules/" },
      { test: /phaser\.js$/, loader: "expose-loader?Phaser" },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "www"),
    compress: true,
    host: "127.0.0.1",
    port: 8080,
    open: true,
  },
  resolve: {
    extensions: [".ts", ".js"],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    alias: {
      phaser: phaser,
    },
  },
};
