const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");

const app = express();

const compiler = webpack(require("./webpack.config.js"));
const devMiddleware = webpackDevMiddleware(compiler, {
  index: false,
  publicPath: "/_build/"
});

app.use(devMiddleware);
