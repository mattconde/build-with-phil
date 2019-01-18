const path = require("path");
const context = process.cwd();
const buildDir = path.resolve(context, "./build/");

module.exports = {
  context,
  mode: "development",
  entry: {
    "main.js": require.resolve("./index")
  },
  resolve: {
    alias: {
      "scripts/app": require.resolve("./app")
    },
    symlinks: true,
    extensions: [".js", ".json"]
  },
  output: {
    path: buildDir,
    filename: "[name]",
    chunkFilename: "[name].js",
    publicPath: "/_build/"
  }
};
