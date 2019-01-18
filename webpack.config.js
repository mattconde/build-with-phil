const path = require("path");
const context = process.cwd();
const buildDir = path.resolve(context, "./build/");

const resourceCondition = {
  include: context,
  exclude: [/node_modules/, buildDir]
};

module.exports = {
  context,
  mode: "development",
  entry: {
    "main.js": require.resolve("./index")
  },
  module: {
    rules: [
      {
        resource: [{ test: /\.js$/ }, resourceCondition],
        use: [
          {
            loader: require.resolve("babel-loader"),
            query: {
              presets: ["@babel/preset-env", "@babel/preset-react"]
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      "scripts/app": require.resolve("./scripts/app")
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
